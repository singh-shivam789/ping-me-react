export default function Loading({ page }) {
    return (
        <img className="spinner" src={`/spinner${page}.gif`} />
    )
}
