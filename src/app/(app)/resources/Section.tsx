export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute -mt-20 h-10 md:-mt-2 md:h-0" id={title} />
      <h1 className="pb-4 text-xl font-medium">{title}</h1>
      {/* <div className="columns-2 gap-4 pb-4">{children}</div> */}
      <div className="before:box-inherit after:box-inherit mx-auto box-border columns-2 gap-4 [column-fill:_balance] 2xl:columns-3">
        {children}
      </div>
    </div>
  );
}
