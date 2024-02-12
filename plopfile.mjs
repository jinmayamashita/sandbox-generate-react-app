const handlebarsHelpers = {
  reverseEach: (context, options) => context.reverse().map(options.fn).join(""),
};

export default (plop) => {
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
          path: "./temp/src/app-providers.tsx",
          templateFile: "./src/templates/app-providers.hbs",
        },
        ...(hasAuth.length
          ? [
              {
                type: "add",
                force: true,
                path: "./temp/src/app.tsx",
                templateFile: "./src/templates/app.hbs",
              },
            ]
          : []),
      ];
    },
  });
};
