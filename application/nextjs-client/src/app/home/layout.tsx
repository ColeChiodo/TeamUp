import NavigationBar from "@/components/NavigationBar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section>
            <NavigationBar />
            {children}
        </section>
    )
}