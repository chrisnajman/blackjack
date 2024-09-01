export default function details(
  detailsIdStr,
  summaryStr,
  summaryStatusStr,
  closeStr
) {
  const detailsId = document.getElementById(detailsIdStr)
  const summary = document.getElementById(summaryStr)
  const summaryStatus = document.getElementById(summaryStatusStr)
  const close = document.getElementById(closeStr)

  detailsId.addEventListener("toggle", () => {
    if (detailsId.open) {
      summary.setAttribute("aria-expanded", "true")
      summaryStatus.textContent = "Close"
    } else {
      summary.setAttribute("aria-expanded", "false")
      summaryStatus.textContent = "Open"
    }
  })

  close.addEventListener("click", () => {
    detailsId.removeAttribute("open")
    summary.setAttribute("aria-expanded", "false")
    summaryStatus.textContent = "Open"
  })
}
