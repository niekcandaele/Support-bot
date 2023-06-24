export interface Tag {
  response: string;
  trigger?: RegExp;
  code?: string;
}

export const tags: Tag[] = [
  {
    trigger: /(test-regex)/,
    response: "Hello from a regex!",
  },
  {
    response: "Hello! This test is successful",
    code: "test",
  },
  {
    trigger: /Not a valid player profile/,
    response:
      "Make sure you have logged in once on your server so that there is a player profile for you. You can see a list of player profiles on your profile page in CSMM.\n\nOtherwise:\n- Log out and log back in to CSMM\n- If that did not fix it, please make a support ticket.",
    code: "shop",
  },
  {
    trigger: /ER_NOT_SUPPORTED_AUTH_MODE/,
    response: `If you're getting the \`ER_NOT_SUPPORTED_AUTH_MODE\` error trying to startup, it means your MySQL install is using the new auth system - which is not compatible with CSMM. 

    Try following [these instructions](<https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server/50547109#50547109>) to change your MySQL password.`,
  },
  {
    trigger: /Invalid OAuth2 redirect_uri/,
    response: `This error is caused by a misconfiguration of the Discord authentication redirect link. This is configured in the Discord developers portal, under the OAuth2 section.

        If your domain is \`example.com\`, the Oauth2 redirect URL would be \`https://example.com/auth/discord/return\`. 
        Note that \`/auth/discord/return\` is always the same, but the first part will be different according to your install.
        
        [Docs](https://docs.csmm.app/en/CSMM/self-host/configuration.html)`,
  },
  {
    trigger:
      /This instance is private and only CSMM system admins can add servers/,
    response: `
        If you are self-hosting this issue is often caused by a misconfiguration of env variables.
        Make sure the \`CSMM_ADMINS\` env variable is uncommented and contains your Steam ID.`,
  },
  {
    response:
      "To generate and reveal your entire map on CSMM, you can use the vanilla `visitmap` command. This command will simulate a player walking along your entire map. \nThe general formula is \n`visitmap -halfmapsize -halfmapsize halfmapsize halfmapsize`\n\nFor example, on an 8K map:\n`visitmap -4096 -4096 4096 4096`\n\nNote that this can take pretty long and is quite CPU intensive.",
    code: "visitmap",
  },
  {
    response:
      "To find the port of the Allocs Fixes webserver, there are 2 options\n\n- Via logs\nIn the output log of your server, find a line like `2018-09-15T01:27:41 61.339 INF Started Webserver on 8090`. 8090 is your port value\n\n- Via serverconfig.xml\nThe port is defined as ControlPanelPort +2. Find that value and in your browser go to http://<yourserverip>:<value>. If you see the Allocs webmap, you've found the correct port!\nPlease note that if you are using a hosting provider, the port in your serverconfig.xml may be remapped and thus the value you get may not be correct\n\n",
    code: "port",
    trigger: /CSMM tried to send a GET request to/,
  },
  {
    response:
      "We will need more info to help you properly. \n\nWhat did you do?\nWhat did you expect to happen?\nWhat happened instead?\n\nPlease provide screenshots or logs if possible",
    code: "moreinfo",
  },
  {
    response:
      "This is the CSMM development server, we only support CSMM. If you have general 7d2d server questions, we will refer you to different discord servers\n\n[Official 7D2D Discord](https://discord.gg/SkuEJjN)\n\n\n7DTD Admin Coalition\n[Website](https://www.7dac.net/)\n[Discord](https://discord.gg/SkgEa9k)\n\n[Official 7D2D forums](https://community.7daystodie.com/forum/3-7-days-to-die-pc/)",
    code: "generalsupport",
  },
  {
    response:
      "Please give us your server ID and which instance you use.\nTo find this info, open up your dashboard or settings page and look at the URL. It will look like \n`https://<INSTANCE>.csmm.app/sdtdserver/<ID>/settings`",
    code: "serverid",
  },
  {
    response:
      "Allocs fixes is a server side mod made by one of the Fun Pimps. It has a lot of useful stuff and is installed on most servers. It is a requirement for CSMM to work.\n\nFor more info see: \n[Allocs fixes documentation & download link](https://7dtd.illy.bz/wiki/Server%20fixes)\n[Detailed installation guide](https://docs.csmm.app/en/CSMM/allocs.html)",
    code: "allocs",
  },
  {
    response:
      "A new experimental feature to get around maps being on http, while csmm being https. To enable goto your server(s) settings page, then scroll to the experimental section at the bottom. Check the checkbox and hit save",
    code: "mapProxy",
  },
  {
    response:
      "- Is Alloc's server fixes installed?\n - [Is it the correct version for your server?](https://7dtd.illy.bz/wiki/Server%20fixes#a7DaystoDievsModversioncompatibility) Ex A18 or A19. \n - Are you self hosting your 7D2D server? If yes, [is your control panel port +2 forwarded in your firewall?](https://canyouseeme.org/). Default port for this is 8082\n- If you are renting, does your host have the port forwarded and what is the port they have assigned to you?\n- Have you created your webtoken? [Video](https://youtu.be/N2LzCQ-5u-0)\n  `webtokens add tokenname tokenpassword 0` \nminimun 10 character password\n\n\n    ",
    code: "checklist",
  },
  {
    response:
      "In order for CSMM to be able to communicate with your server, you have to set up authentication info on your server.\nThe easiest way to do this is with the `webtokens` command inside your telnet/ingame command console. Please choose a strong and random token. If someone guesses this token, he/she will get FULL access to your server console and will be able to execute ANY command.\n\n[Generated random code](https://www.random.org/strings/?num=10&len=20&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new)\n\nExample: `webtokens add <name> <token> 0`\n[More info](https://docs.csmm.app/en/CSMM/installation.html#set-up-web-api-credentials) ",
    code: "webtokens",
    trigger: /CSMM could not execute the 'mem' command on your server./,
  },
  {
    response: `

    There are two ways to use CSMM:
    
    - **Self Hosting**: Self hosting CSMM is free, but requires some solid technical know-how to get running. [More info](https://docs.csmm.app/en/CSMM/self-host/installation.html)
    
    - **Paid Hosting**: Alternatively, you can pay a monthly fee to use the hosted instances of CSMM, which will get you started quicker than self-hosting. See the 'plans' section [here](https://csmm.app/).

    [Info on all benefits](https://www.csmm.app/donate.html)
    
    Make sure you link your Discord profile to CSMM [[EU](https://eu.csmm.app/auth/discord) [US](https://us.csmm.app/auth/discord) [AU](https://au.csmm.app/auth/discord)] and [to Patreon](https://support.patreon.com/hc/en-us/articles/212052266-Get-my-Discord-role) after donating.
    It could take up to 5-10 minutes for the sync to occur. If after this time you still don't have a Discord role, try linking Discord on CSMM *again*.
    
    `,
    code: "donate",
  },
  {
    response:
      "You can file a feature request or a bug report on our [issue tracker](<https://github.com/CatalysmsServerManager/7-days-to-die-server-manager/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc>)\n\nCheck that you are not creating a duplicate issue, please!\n",
    code: "issue",
  },
  {
    response:
      "Please screenshot/copypaste the logs from your browser. \n\n[How to access browser console](https://balsamiq.com/support/faqs/browserconsole/)",
    code: "browserlogs",
  },
  {
    response:
      "If you are using a rented server, be aware that a lot of providers block .dll uploads! It's possible you copied the CPM files but the .dlls never got transfered. \n\nMake sure there are .dll files inside the `1CSMM_Patrons` folder. If there is not, you will have to create a ticket with your hosting provider and ask to install CPM.",
    code: "dllblock",
  },
  {
    response:
      "The public instances are donator only.\n\nIf you wish to continue to use the public instances, you will have to register for a paid plan via [Patreon](https://www.patreon.com/catalysm).\n\nIf you wish to continue to use CSMM for free, you can install it on your own server. [Docs](https://docs.csmm.app/en/CSMM/self-host/installation.html) \n\n --- \n\n If you have already donated and are still getting this message, please check and make sure your Discord account is connected to Patreon and to CSMM. You can check your donator status on your profile page on CSMM.",
    code: "publicinstance",
    trigger:
      /This instance is reserved for donators, please use a public instance instead/,
  },
  {
    response: `CSMM Patron's Mod (CPM) is a companion mod to CSMM maintained by Prisma. Its free to use and can be used without CSMM. CPM is a forked extension of Coppi's Mod (used and continued under a new name with permission of original author Danilo Coppi), extending the functionality of existing commands, and adding new commands and features. CPM adds loads of new features to your server. These features include both console commands, as well as chat commands. Use it to extend the possibilities of what you can do with CSMM.
      
      [Downloads](https://github.com/Prisma501/CSMM-Patrons-Mod/releases)
      [Documentation](https://docs.csmm.app/en/cpm/)
      [Patched map.js](https://github.com/Prisma501/Allocs-Webmap-for-CPM)
      `,
    code: "cpm",
  },
  {
    response:
      "Please try toggling CSMM Features off and back on again.\n\nIn Settings, Basic server settings, clear the checkbox for Enable CSMM features, then click Save.\nTick the checkbox again and click Save again.",
    code: "toggle",
  },
  {
    response: "https://docs.csmm.app",
    code: "docs",
  },
  {
    response:
      "If you are using a Steam ID in your command, note that it must be in the format Steam_71234567890123456. The capital S on Steam is important.",
    code: "steamid",
  },
  {
    trigger: /EADDRINUSE/,
    response: `Hi there,

    It seems like you are encountering an \`EADDRINUSE\` error when trying to run CSMM. This error occurs when the port CSMM is trying to use is already occupied by another process. Here's how you can resolve this:
    
    1. **Check for Processes Using the Port**: First, you need to check if any other process is using the port CSMM is trying to run on. If you are on Linux, use the command \`sudo ss -tlpn\` to get a list of everything that has a port open.
    
    2. **Change the Port or Terminate the Existing Process**: Once you identify the process using the port, you can either terminate it or change the port that CSMM uses. To change the port, you can use the environment variable by editing the \`.env\` file ([see example](https://github.com/CatalysmsServerManager/7-days-to-die-server-manager/blob/master/.env.example.docker#L3)) or with Docker, using the Docker port forwarding options.
    
    3. **Restart CSMM**: After making these changes, try restarting CSMM and see if the issue is resolved.
    `,
  },
  {
    code: "7d2d.net",
    response: `Hello! It seems that you are referring to csmm.7d2d.net. 
    
    Please be informed that this site is not hosted or managed by the CSMM team and instead is managed by a third party. 
    We cannot provide support or troubleshooting for this site.
    As an alternative, you can use the instances managed by The CSMM team: [[EU](https://eu.csmm.app/auth/discord) [US](https://us.csmm.app/auth/discord) [AU](https://au.csmm.app/auth/discord)]`,
  },
];
