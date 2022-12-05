listOf("start", "build", "test", "eject").forEach { cmd ->
    task<Exec>(cmd) {
        commandLine("pnpm", "react-scripts", cmd)
    }
}
