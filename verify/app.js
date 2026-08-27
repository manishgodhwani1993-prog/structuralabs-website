
/*
 * STRUCTURA LABS - Report Verification
 * Works on GitHub Pages and Custom Domain
 */

const isGitHubPages = window.location.hostname.includes("github.io");
const BASE_PATH = isGitHubPages ? "/structuralabs-website" : "";

let reports = [];

/* Load report database */
async function loadReports() {
  try {
    const response = await fetch(`${BASE_PATH}/data/reports.json`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    reports = await response.json();

    // Check if URL contains a report number
    const parts = window.location.pathname.split("/").filter(Boolean);
    const lastSegment = parts[parts.length - 1];

    if (lastSegment && lastSegment !== "verify") {
      const input = document.getElementById("searchInput");
      if (input) input.value = lastSegment;
      verify(lastSegment);
    }

  } catch (err) {
    console.error("Unable to load report database:", err);

    document.getElementById("result").innerHTML = `
      <div class="card">
        <div class="red">⚠ System Error</div>
        <p>Unable to load the report database.</p>
        <p>Please contact STRUCTURA LABS.</p>
      </div>`;
  }
}

loadReports();

/* Verify button */
function verifyReport() {
  const report = document.getElementById("searchInput").value.trim();
  verify(report);
}

/* Verify report */
function verify(reportNumber) {

  const result = document.getElementById("result");

  if (!reportNumber) {
    result.innerHTML = `
      <div class="card">
        <div class="red">Enter Report Number</div>
      </div>`;
    return;
  }

  const report = reports.find(r => r.report === reportNumber);

  if (report) {

    result.innerHTML = `
      <div class="card">

        <div class="green">✓ Report Verified</div>

        <div class="row">
          <span>Report Number</span>
          <strong>${report.report}</strong>
        </div>

        <div class="row">
          <span>Client</span>
          <strong>${report.client}</strong>
        </div>

        <div class="row">
          <span>Sample</span>
          <strong>${report.sample}</strong>
        </div>

        <div class="row">
          <span>Issue Date</span>
          <strong>${report.date}</strong>
        </div>

        <div class="row">
          <span>Status</span>
          <strong>${report.status || "Verified"}</strong>
        </div>

        <a href="${BASE_PATH}${report.pdf}"
           target="_blank"
           class="download">
          Download Original Report
        </a>

      </div>
    `;

  } else {

    result.innerHTML = `
      <div class="card">

        <div class="red">✕ Report Not Found</div>

        <p>
          This report number does not exist in STRUCTURA LABS records.
        </p>

      </div>
    `;

  }

}

/* Allow Enter key to verify */
document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("searchInput");

  if (input) {

    input.addEventListener("keypress", function (e) {

      if (e.key === "Enter") {
        verifyReport();
      }

    });

  }

});
