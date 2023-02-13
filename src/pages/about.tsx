import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { TopLevelBreadcrumb } from "@/components/BreadcrumbBar";

const About: NextPage = () => {
  return (
    <Layout
      // title="About"
      breadcrumbs={TopLevelBreadcrumb("About", "/about")}
    >
      <div className="flex w-full flex-col"></div>
    </Layout>
  );
};

export default About;
