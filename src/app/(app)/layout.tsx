import { MobileSidebar } from "@/components/core/nav/MobileSidebar";
import { DesktopSidebar } from "@/components/core/nav/DesktopSidebar";
import { SidebarButton } from "@/components/core/nav/SidebarButton";
import Footer from "@/components/core/nav/footer";

// export default function AppLayout({ children }: { children: React.ReactNode }) {
//   return <div>{children}</div>;
// }

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
                {/* Replace with your content */}
                <div className="flex flex-col py-4">
                  {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" /> */}
                  {/* {breadcrumbs && <BreadcrumbBar breadcrumbs={breadcrumbs} />} */}
                  {/* <div>
                      {title && (
                        <div className="max-w-7xl pt-4 sm:px-6 md:px-8">
                          <h1 className="text-2xl font-semibold text-gray-900">
                            {title}
                          </h1>
                        </div>
                      )}
                    </div> */}
                  {children}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>

          <div className="flex grow" />
          <Footer />
        </div>
      </div>
    </>
  );
}
