import './MetricCard.css'

type MetricCardProps = {
  label: string
  value: string
  description: string
}

export function MetricCard({
  label,
  value,
  description,
}: MetricCardProps) {
  return (
    <article className="metric-card">
      <h2>{label}</h2>
      <p className="metric-value">{value}</p>
      <p className="metric-description">{description}</p>
    </article>
  )
}