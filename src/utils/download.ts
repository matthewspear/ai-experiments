export function downloadText(input: string, filename: string) {
  const blob = new Blob([input], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.txt`;
  link.href = url;
  link.click();
}

export function downloadJSON(input: string, filename: string) {
  const blob = new Blob([input], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.json`;
  link.href = url;
  link.click();
}
