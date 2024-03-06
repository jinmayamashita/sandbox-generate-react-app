import path from "node:path";
/**
 * TODO: to ts and using plop programmatic api
 * https://github.com/plopjs/plop/issues/297
 * https://github.com/plopjs/plop/issues/214
 */
const handlebarsHelpers = {
  reverseEach: (context, options) => context.reverse().map(options.fn).join(""),
};

export default (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  console.log("path: ", plop.getDestBasePath());
  plop.setHelper("reverseEach", handlebarsHelpers.reverseEach);

  plop.setGenerator("appProviders", {
    prompts: [
      {
        type: "checkbox",
        name: "providers",
        message: "Select feature to include:",
        choices: [
          {
            name: "authentication",
            value: {
              component: "AuthenticationProvider",
              name: "authentication",
            },
            checked: true,
          },
          {
            name: "theme",
            value: { component: "ThemeProvider", name: "theme" },
            checked: false,
          },
        ],
      },
    ],
    actions: ({ providers }) => {
      const hasAuth = providers.filter(({ name }) => name === "authentication");

      return [
        {
          type: "add",
          force: true,
          // path: "./{{dest}}/app-providers.tsx",
          destination: "{{dest}}",
          path: "src/app-providers.tsx",
          templateFile: "templates/react/app-providers.hbs",
        },
        ...(hasAuth.length
          ? [
              {
                type: "add",
                force: true,
                // path: "./{{dest}}/app.tsx",
                // path: path.join(process.cwd(), "src/app.tsx"),
                templateFile: "templates/react/app.hbs",
              },
            ]
          : []),
      ];
    },
  });
};
