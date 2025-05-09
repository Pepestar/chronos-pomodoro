type ContentProps = {
  children: React.ReactNode
}

export function Content({ children }: ContentProps) {
  return (
    <div className="container">
      <div className="`content">{children}</div>
    </div>
  )
}