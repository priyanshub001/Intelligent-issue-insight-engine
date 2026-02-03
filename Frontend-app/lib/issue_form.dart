import 'package:flutter/material.dart';
import 'result_page.dart';

class IssueFormPage extends StatefulWidget {
  const IssueFormPage({super.key});

  @override
  State<IssueFormPage> createState() => _IssueFormPageState();
}

class _IssueFormPageState extends State<IssueFormPage> {
  final TextEditingController issueController = TextEditingController();

  void submitIssue() {
    String issueText = issueController.text.trim();
    if (issueText.isEmpty) return;

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => ResultPage(issueText: issueText),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF1D2671), Color(0xFFC33764)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Intelligent Issue\nInsight Engine",
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  "Describe your issue below",
                  style: TextStyle(color: Colors.white70),
                ),
                const SizedBox(height: 30),

                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: TextField(
                    controller: issueController,
                    maxLines: 5,
                    decoration: const InputDecoration(
                      hintText: "e.g. WiFi is not working in hostel",
                      border: InputBorder.none,
                    ),
                  ),
                ),

                const SizedBox(height: 30),

                SizedBox(
                  width: double.infinity,
                  height: 55,
                  child: ElevatedButton(
                    onPressed: submitIssue,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.black,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                    ),
                    child: const Text(
                      "Analyze Issue",
                      style: TextStyle(fontSize: 16, color: Colors.white),
                    ),
                  ),
                ),

                const Spacer(),

                TextButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/dashboard');
                  },
                  child: const Text(
                    "Go to Admin Dashboard →",
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
