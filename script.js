const input = document.getElementById("inputText");
const output = document.getElementById("outputText");
const source = document.getElementById("sourceLang");
const target = document.getElementById("targetLang");
const translateBtn = document.getElementById("translateBtn");
const notice = document.getElementById("notice");
const statusLabel = document.getElementById("status");

input.addEventListener("input", () => {
  document.getElementById("charCount").textContent = `${input.value.length} / 500`;
});
document.getElementById("clearBtn").addEventListener("click", () => {
  input.value = ""; input.dispatchEvent(new Event("input")); output.textContent = "Your translation will appear here.";
  notice.textContent = ""; statusLabel.textContent = "READY";
});
document.getElementById("swapBtn").addEventListener("click", () => {
  const oldSource = source.value; source.value = target.value; target.value = oldSource;
  const oldText = input.value; input.value = output.textContent === "Your translation will appear here." ? oldText : output.textContent;
  input.dispatchEvent(new Event("input")); output.textContent = "Your translation will appear here.";
});
document.getElementById("copyBtn").addEventListener("click", async () => {
  const text = output.textContent;
  if (!text || text === "Your translation will appear here.") return;
  try { await navigator.clipboard.writeText(text); notice.textContent = "Translation copied to clipboard."; }
  catch { notice.textContent = "Clipboard access is unavailable in this browser."; }
});

translateBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  notice.textContent = "";
  if (!text) { notice.textContent = "Please enter some text first."; return; }
  if (source.value === target.value) { output.textContent = text; statusLabel.textContent = "DONE"; return; }
  translateBtn.disabled = true; translateBtn.querySelector("span").textContent = "Translating...";
  statusLabel.textContent = "WORKING";
  try {
    const pair = `${source.value}|${target.value}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${encodeURIComponent(pair)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Translation service returned an error.");
    const data = await response.json();
    if (data.responseStatus !== 200 || !data.responseData?.translatedText) {
      throw new Error(data.responseDetails || "No translation was returned. Please try again.");
    }
    output.textContent = data.responseData.translatedText;
    statusLabel.textContent = "DONE";
  } catch (error) {
    statusLabel.textContent = "ERROR";
    notice.textContent = error.message.includes("Failed to fetch")
      ? "Could not reach the translation API. Check your internet connection and try again."
      : error.message;
  } finally {
    translateBtn.disabled = false; translateBtn.querySelector("span").textContent = "Translate text";
  }
});
