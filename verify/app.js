
/* ==========================================================
   STRUCTURA LABS - Report Verification Portal
   Version: 2.0
   Compatible with:
   - structuralabs.in
   - GitHub Pages
========================================================== */

const isGitHubPages = window.location.hostname.includes("github.io");
const BASE_PATH = isGitHubPages ? "/structuralabs-website" : "";

let reports = [];

/* ---------------------------
   Load Report Database
---------------------------- */

async function loadReports() {

    try {

        const response = await fetch(`${BASE_PATH}/data/reports.json`);

        if (!response.ok) {

            throw new Error(`HTTP ${response.status}`);

        }

        reports = await response.json();

        const params = new URLSearchParams(window.location.search);
        const report = params.get("report");

        if (report) {

            document.getElementById("searchInput").value = report;

            verify(report);

        }

    }

    catch (error) {

        console.error(error);

        document.getElementById("result").innerHTML = `

        <div class="card">

            <div class="red">System Error</div>

            <p style="margin-top:15px;color:#666;">
                Unable to load the report database.
            </p>

        </div>

        `;

    }

}

loadReports();

/* ---------------------------
   Search Button
---------------------------- */

function verifyReport() {

    const report = document.getElementById("searchInput").value.trim();

    if (!report) {

        document.getElementById("result").innerHTML = `

        <div class="card">

            <div class="red">Enter Report Number</div>

        </div>

        `;

        return;

    }

    verify(report);

}

/* ---------------------------
   Verify Report
---------------------------- */

function verify(reportNumber) {

    const item = reports.find(r => r.report === reportNumber);

    const result = document.getElementById("result");

    if (item) {

        const verifiedTime = new Date().toLocaleString("en-IN", {

            dateStyle: "medium",
            timeStyle: "short"

        });

        result.innerHTML = `

        <div class="card">

            <div class="verified-header">

                <div class="shield">✓</div>

                <div>

                    <h2>Report Verified</h2>

                    <p>Authenticity confirmed by STRUCTURA LABS</p>

                </div>

            </div>

            <div class="row">

                <span>Report Number</span>

                <div class="report-box">

                    <strong class="report-no">${item.report}</strong>

                    <button onclick="copyReport()">
                        Copy
                    </button>

                </div>

            </div>

            <div class="row">

                <span>Client</span>

                <strong>${item.client}</strong>

            </div>

            <div class="row">

                <span>Sample</span>

                <strong>${item.sample}</strong>

            </div>

            <div class="row">

                <span>Issue Date</span>

                <strong>${item.date}</strong>

            </div>

            <div class="row">

                <span>Status</span>

                <strong>${item.status || "Verified"}</strong>

            </div>

            <div class="row">

                <span>Verified On</span>

                <strong>${verifiedTime}</strong>

            </div>

            <a class="download"
               href="${BASE_PATH}${item.pdf}"
               target="_blank">

                Download Original Report

            </a>

        </div>

        `;

    }

    else {

        result.innerHTML = `

        <div class="card">

            <div class="red">Report Not Found</div>

            <p style="margin-top:15px;color:#666;line-height:1.6;">

                The report number

                <strong>${reportNumber}</strong>

                does not exist in STRUCTURA LABS records.

            </p>

        </div>

        `;

    }

}

/* ---------------------------
   Copy Report Number
---------------------------- */

function copyReport() {

    const report = document.querySelector(".report-no").innerText;

    navigator.clipboard.writeText(report);

    const button = document.querySelector(".report-box button");

    button.innerText = "Copied";

    setTimeout(() => {

        button.innerText = "Copy";

    }, 1800);

}

/* ---------------------------
   Enter Key Support
---------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");

    input.addEventListener("keypress", function(e){

        if(e.key==="Enter"){

            verifyReport();

        }

    });

});
