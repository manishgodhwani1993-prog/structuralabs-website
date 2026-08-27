
let reports=[];

// Load the report database
fetch('/data/reports.json')
.then(response=>response.json())
.then(data=>{

    reports=data;

    // Detect if URL contains a report number
    const path=window.location.pathname.split("/");

    if(path.length>2){

        const reportNumber=path[path.length-1];

        if(reportNumber!=="verify"){

            document.getElementById("searchInput").value=reportNumber;
            verify(reportNumber);

        }
    }
});

// Verify when button is clicked
function verifyReport(){

    const report=document.getElementById("searchInput").value.trim();

    verify(report);

}

// Verification function
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

            <a href="${item.pdf}" target="_blank" class="download">
                Download Original Report
            </a>

        </div>
        `;

    }else{

        result.innerHTML=`
        <div class="card">

            <div class="red">✕ Report Not Found</div>

            <p>This report number does not exist in STRUCTURA LABS records.</p>

        </div>
        `;

    }

}
