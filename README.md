![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-simplybook

This repo contains custom nodes for integrating with the SimplyBook.me API in [n8n](https://n8n.io). It includes the node linter and other dependencies.

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and pnpm. Minimum version Node 18. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
  ```
  pnpm install n8n -g
  ```
* Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

## Using this starter

These are the basic steps for working with the starter. For detailed guidance on creating and publishing nodes, refer to the [documentation](https://docs.n8n.io/integrations/creating-nodes/).

1. Clone this repo:
   ```
   git clone https://..../<your organization>/<your-repo-name>.git
   ```
2. Run `pnpm i` to install dependencies.
3. Open the project in your editor.
4. Browse the examples in `/nodes` and `/credentials`. Modify the examples, or replace them with your own nodes.
5. Update the `package.json` to match your details.
6. Run `pnpm lint` to check for errors or `pnpm lintfix` to automatically fix errors when possible.
7. Test your node locally. Refer to [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/) for guidance.


## SimplyBook.me Node

This project includes custom nodes for interacting with the SimplyBook.me API. The following resources and operations are available:

### Resources

- **Service**
- **Provider**
- **Location**
- **Category**
- **Slot**

### Operations

- **Get Services**: Retrieve services with filter search.
- **Get Providers**: Retrieve providers with filter search.
- **Get Locations**: Retrieve locations with filter search.
- **Get Categories**: Retrieve categories with filter search.
- **Get Slots**: Retrieve available slots for booking as admin.

## More information

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](LICENSE.md)
