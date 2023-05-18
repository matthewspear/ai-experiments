export function UpgradeButton() {
  return (
    <div className="mb-2 mt-2 flex">
      <a
        href="mailto:ai@mattspear.co?subject=AI%20Experiments%20Upgrade"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Upgrade to GPT-4 for 30$ per month
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  );
}
