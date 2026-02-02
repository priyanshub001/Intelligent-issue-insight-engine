import 'package:flutter/material.dart';
import 'main.dart';

class AdminPanel extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    issueList.sort((a, b) => a.priority.compareTo(b.priority));

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        title: const Text("Admin Dashboard"),
      ),
      body: ListView.builder(
        itemCount: issueList.length,
        itemBuilder: (_, i) {
          final issue = issueList[i];
          Color color = issue.priority == 1
              ? Colors.red
              : issue.priority == 2
              ? Colors.orange
              : Colors.green;

          return Container(
            margin: const EdgeInsets.all(10),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFF1E293B),
              borderRadius: BorderRadius.circular(16),
              border: Border(left: BorderSide(color: color, width: 5)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(issue.type,
                    style: TextStyle(
                        color: color, fontWeight: FontWeight.bold)),
                const SizedBox(height: 6),
                Text(issue.text,
                    style: const TextStyle(color: Colors.white)),
              ],
            ),
          );
        },
      ),
    );
  }
}
