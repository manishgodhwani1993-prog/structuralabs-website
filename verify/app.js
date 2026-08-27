
const path = window.location.pathname.split("/").filter(Boolean);
const lastSegment = path[path.length - 1];

if (lastSegment && lastSegment !== "verify") {
    document.getElementById("searchInput").value = lastSegment;
    verify(lastSegment);
}
