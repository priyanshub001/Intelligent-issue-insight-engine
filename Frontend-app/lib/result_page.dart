import 'package:flutter/material.dart';

class ResultPage extends StatelessWidget {
  final String issueText;

  const ResultPage({super.key, required this.issueText});

  // TEMP LOGIC (backend/ML ke baad replace hoga)
  String getCategory() {
    if (issueText.toLowerCase().contains("wifi")) return "Network";
    if (issueText.toLowerCase().contains("projector")) return "Facilities";
    if (issueText.toLowerCase().contains("login")) return "IT Support";
    return "General";
  }

  String getPriority() {
    if (issueText.toLowerCase().contains("not working")) return "High";
    if (issueText.toLowerCase().contains("slow")) return "Medium";
    return "Low";
  }

  @override
  Widget build(BuildContext context) {
    String category = getCategory();
    String priority = getPriority();

    return Scaffold(
      appBar: AppBar(title: const Text("Analysis Result")),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              elevation: 4,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    const Text(
                      "Detected Category",
                      style: TextStyle(color: Colors.grey),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      category,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 20),

            Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              elevation: 4,
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    const Text(
                      "Predicted Priority",
                      style: TextStyle(color: Colors.grey),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      priority,
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: priority == "High"
                            ? Colors.red
                            : priority == "Medium"
                            ? Colors.orange
                            : Colors.green,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
