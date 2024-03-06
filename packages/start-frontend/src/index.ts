#!/usr/bin/env node

import * as p from "@clack/prompts";
import gradient from "gradient-string";
import path from "node:path";
import { execSync } from "node:child_process";
import { setTimeout } from "node:timers/promises";

const g = gradient("#53575a", "#53575a");
const t = gradient("#53575a", "#ffff00");

// const WORKING_DIR = process.cwd();
const PACKAGE_DIR = path.resolve(__dirname, "..");
const MONOREPO_DIR = path.resolve(PACKAGE_DIR, "../..");
const CODE_DIRECTORY = path.resolve(MONOREPO_DIR, "code");

type Inputs = {
  ui: string;
  api?: string;
  functions: string[];
  tools?: string[];
  destination: string;
};

async function generateCode({ ui, destination, functions }: Inputs) {
  // Copy the core files
  execSync(
    `rsync -avq --exclude='node_modules' "${CODE_DIRECTORY}/${ui}/core/" "${destination}"`
  );

  // Copy the functions files
  for (const func of functions) {
    execSync(
      `rsync -avq --exclude={'node_modules','package.json','tsconfig.json'} "${CODE_DIRECTORY}/${ui}/functions/${func}/" "${destination}/src/components/${func}"`
    );
  }

  // Copy routing files
  let routerFile = functions.includes("authentication")
    ? "authenticated-router.tsx"
    : "router.tsx";
  execSync(
    `cp "${CODE_DIRECTORY}/${ui}/functions/routing-wouter/${routerFile}" "${destination}/src/router.tsx"`
  );

  // TODO: Plopfile.js
  // e.g. execSync(cd ${PACKAGE_DIR} && pnpm plop component -- --providers theme -- --dest ${WORKING_DIR})
}

async function main() {
  console.clear();
  await setTimeout(500);

  p.intro(`${g("ꮙ START-")}${t("FRONTEND")}`);
  p.note(`${t("Creating a new front-end codebase!")}`);

  const inputs = await p.group(
    {
      ui: () =>
        p.select({
          message: "Choose a Library/Framework for web user interfaces:",
          initialValue: "react",
          options: [
            { label: "React", value: "react" },
            { label: "Next.js", value: "nextjs" },
            { label: "Vue", value: "vue" },
          ],
        }),

      // TODO:
      // api: () =>
      //   p.select({
      //     message: "Choose an API architecture for your project:",
      //     initialValue: "restful",
      //     options: [
      //       { label: "RESTful APIs", value: "restful" },
      //       { label: "GraphQL", value: "graphql" },
      //       { label: "gRPC", value: "grpc" },
      //     ],
      //   }),

      functions: () =>
        p.multiselect({
          message: "Select the application functions you want to include:",
          initialValues: ["shop-catalog-management", "toggle-switch"],
          options: [
            {
              value: "shop-catalog-management",
              label: "Shop catalog management",
              hint: "CRUD operations for products, etc.",
            },
            {
              value: "authentication",
              label: "Authentication",
              hint: "recommended",
            },
            { value: "dark-theme", label: "Dark theme" },
            { value: "widget", label: "Widget" },
            { value: "toggle-switch", label: "Toggle switch" },
          ],
        }),

      // TODO:
      // tools: () =>
      //   p.multiselect({
      //     message: "Select additional tools you want to include:",
      //     initialValues: ["prettier", "eslint"],
      //     options: [
      //       { value: "prettier", label: "Prettier", hint: "recommended" },
      //       { value: "eslint", label: "ESLint", hint: "recommended" },
      //       { value: "gh-action", label: "GitHub Action" },
      //     ],
      //   }),

      destination: () =>
        p.text({
          message: "Enter the directory path to store your project:",
          initialValue: "./my-app",
        }),
    },
    {
      onCancel: () => {
        p.cancel("👋 Operation cancelled!");
        process.exit(0);
      },
    }
  );

  const spinner = p.spinner();
  spinner.start("Copying files...");

  await generateCode(inputs);

  spinner.stop("Files copied!");

  p.outro("✨ Your project setup is complete!");
}

main().catch(console.error);
