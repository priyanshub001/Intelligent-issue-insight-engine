import 'package:flutter/material.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Admin Dashboard")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Row(
              children: const [
                Expanded(child: DashboardCard("Network", "14", Colors.blue)),
                SizedBox(width: 10),
                Expanded(child: DashboardCard("Facilities", "9", Colors.orange)),
              ],
            ),
            const SizedBox(height: 10),
            Row(
              children: const [
                Expanded(child: DashboardCard("IT Support", "11", Colors.purple)),
                SizedBox(width: 10),
                Expanded(child: DashboardCard("Admin", "6", Colors.green)),
              ],
            ),
            const SizedBox(height: 30),

            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                "Top Keywords",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 10),

            Wrap(
              spacing: 8,
              children: const [
                Chip(label: Text("wifi")),
                Chip(label: Text("login")),
                Chip(label: Text("slow")),
                Chip(label: Text("projector")),
              ],
            )
          ],
        ),
      ),
    );
  }
}

class DashboardCard extends StatelessWidget {
  final String title;
  final String count;
  final Color color;

  const DashboardCard(this.title, this.count, this.color, {super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(
              count,
              style: TextStyle(
                fontSize: 26,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: 5),
            Text(title),
          ],
        ),
      ),
    );
  }
}
