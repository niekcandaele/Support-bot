import { request, gql } from 'graphql-request';
import NodeCache from "node-cache";
import safe_regex from 'safe-regex';

const cache = new NodeCache({ stdTTL: 10, checkperiod: 5 });

const query = gql`
  {
    tags {
        trigger
        response
        code
      }
  }
`

const isRegex = (x) => /^\/.*\/$/.test(x)

export interface Tag {
    response: string,
    trigger: string | RegExp,
    code: string
}


// Subscription would be better but Strapi GraphQL plugin has no support for it (yet) :(
// Fine for now, if this ever has to scale we should switch to keeping tags in pg anyways
export default async function getTags(): Promise<Tag[]> {
    let tags = cache.get('tags') as Tag[];

    if (!tags) {
        const data = await request(process.env.STRAPI_GQL_URL, query);

        data.tags = data.tags.map(tag => {

            if (isRegex(tag.trigger) && safe_regex(tag.trigger)) {
                tag.trigger = new RegExp(tag.trigger.substring(1, tag.trigger.length - 1))
            }
            return {
                trigger: tag.trigger,
                response: tag.response,
                code: tag.code
            }
        }) as Tag[]

        cache.set('tags', data.tags);
        tags = data.tags
    }

    return tags;
}