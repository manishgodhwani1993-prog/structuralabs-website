
/* STRUCTURA LABS Verification */

let reports=[];

// Load database
fetch("../data/reports.json")
.then(r=>r.json())
.then(data=>{

    reports=data;

    // Read ?report= from URL
    const params=new URLSearchParams(window.location.search);
    const report=params.get("report");

    if(report){

        document.getElementById("searchInput").value=report;
        verify(report);

    }

})
.catch(()=>{

    document.getElementById("result").innerHTML=`
    <div class="card">
      <div class="red">⚠ Unable to load report database</div>
    </div>
    `;

});

function verifyReport(){

    const report=document.getElementById("searchInput").value.trim();

    verify(report);

}

function verify(report){

    const item=reports.find(r=>r.report===report);

    const result=document.getElementById("result");

    if(item){

        result.innerHTML=`

        <div class="card">

            <div class="green">✓ Report Verified</div>

            <div class="row">
                <span>Report Number</span>
                <strong>${item.report}</strong>
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
                <strong>${item.status}</strong>
            </div>

            <a class="download"
               href="../reports/STL-26-000123.pdf"
               target="_blank">
               Download Original Report
            </a>

        </div>

        `;

    }else{

        result.innerHTML=`

        <div class="card">

            <div class="red">✕ Report Not Found</div>

            <p>This report number does not exist.</p>

        </div>

        `;

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    document.getElementById("searchInput")
    .addEventListener("keypress",function(e){

        if(e.key==="Enter"){
            verifyReport();
        }

    });

});
