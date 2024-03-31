import { DesktopSidebar } from "@/components/core/nav/DesktopSidebar";
import Footer from "@/components/core/nav/footer";
import { MobileSidebar } from "@/components/core/nav/MobileSidebar";
import { SidebarButton } from "@/components/core/nav/SidebarButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function NotFound() {
  return (
    <div>
      {/* Sidebar for mobile */}
      <MobileSidebar />

      {/* Static sidebar for desktop */}
      <DesktopSidebar />

      <div className="flex min-h-screen flex-1 flex-col md:pl-64">
        <SidebarButton />

        <main className="flex-1">
          <div className="">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <div className="flex flex-col py-4">
                <div className="flex w-full flex-col gap-4">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <div className="prose prose-lg prose-slate pt-8">
                    <h3>Something went wrong!</h3>
                    <p>Please try again...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="flex grow" />
        <Footer />
      </div>
    </div>
  );
}
