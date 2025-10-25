# Azure Incident Response Playbook

This playbook provides automated methods to detect and respond to public Blob Storage access in Azure, leveraging native tools and automation.

## Table of Contents
- [🎯 Objective](#objective)
- [🛠️ Tools Used](#tools-used)
- [🧠 Why This Matters](#why-this-matters)
- [💥 Outcome](#outcome)
- [🔬 Real-World Scenario](#real-world-scenario)
- [🛠️ Azure Logic App: Automated Alert Response](#azure-logic-app-automated-alert-response)
- [📁 Logic App Definition](#logic-app-definition)
- [📧 Email Notification](#email-notification)
- [🌐 Trigger](#trigger)
- [🔐 Security & Secrets Management](#security--secrets-management)
- [🎉 Usage](#usage)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

## 🎯 Objective
Detect and respond to public Blob storage access in Azure using native tools and automation.

## 🛠️ Tools Used
- **Azure Defender for Storage**: Provides security alerts for Blob storage.
- **Azure Monitor & Sentinel**: For monitoring and logging.
- **Azure Logic Apps + Functions**: For automation.
- **PowerShell**: For simulations.

## 🧠 Why This Matters
Publicly exposed blob containers are among the most exploited misconfigurations in Azure. This playbook simulates a breach and shows how to contain it quickly.

## 💥 Outcome
✔️ Real-time alert on blob misconfiguration  
✔️ Automated remediation using Logic Apps or Azure Functions  
✔️ SIEM logging into Sentinel with threat tags  

## 🔬 Real-World Scenario
This playbook automates alert responses via a Logic App, triggered by a security alert or manual HTTP request, which sends an email to the security team detailing the incident.

## ⚙️ Azure Logic App: Automated Alert Response

This Logic App is triggered by a security alert (or manual HTTP trigger) and automatically sends an email to the security team with details of the incident.

- Logic App Definition: [View JSON](logic-apps/blob-alert-remediation.json)
- Email Notification: Configured via shared mailbox in Azure
- Trigger: HTTP Request (simulating alert system)
### 📁 Logic App Definition
[View JSON](logic-apps/blob-alert-remediation.json)

# 🔍 Public Blob Misconfiguration – Real-World Simulation

## 🧪 Goal
Simulate a real-world cloud security breach caused by misconfigured Azure Blob storage and demonstrate automated incident response.

## 💣 Breach Steps
1. Created a blob container with public read access
2. Uploaded a file simulating sensitive internal data
3. Accessed the blob anonymously via direct URL
4. Triggered Logic App via HTTP or alert simulation
5. Auto-remediation: removed public access + email notification sent

## ✅ Success Indicators
- Logic App fired immediately
- Access to the blob revoked
- Email received with breach info

## 📌 Lessons Learned
Misconfigurations are still the biggest real-world cloud risk. This workflow proves response time can be reduced to seconds through automation.
## 🧠 Architecture Flow

![Logic Flow] (https://docs.google.com/document/d/1ymf0H8FPWlSiFtJzizTa754bXj6OIMSMutZWDZ1I4J0/edit?usp=sharing)

### 📧 Email Notification
Configured via a shared mailbox in Azure  

### 🌐 Trigger
HTTP Request (simulating alert system)

![Logic App Flow] (https://docs.google.com/document/d/1j--lCkL3hrCUEw3Xb_zDK0R8PVreEPYZKjILmOXkr6E/edit?usp=sharing)

## 🔐 Security & Secrets Management

### Environment Variables
This project uses environment variables for configuration. **Never commit sensitive credentials to version control.**

#### Setup Instructions
1. Copy `.env.example` to `.env`
2. Fill in your Azure credentials and configuration
3. Ensure `.env` is listed in `.gitignore` (already configured)

#### Best Practices
- **Use Azure Key Vault** for production secrets
- **Enable Managed Identities** to eliminate hardcoded credentials
- **Rotate credentials regularly** (every 90 days minimum)
- **Follow least privilege principle** for all service principals and access keys

📖 **See [SECURITY.md](SECURITY.md) for comprehensive secrets management guidelines**

### Key Security Features
- ✅ `.gitignore` configured to prevent credential exposure
- ✅ `.env.example` template provided for easy setup
- ✅ Azure Key Vault integration recommended
- ✅ Managed Identity support for secure authentication
- ✅ Audit logging for all security operations

## 🎉 Usage
Instructions on how to trigger the automation and what to expect after running it.

## 🤝 Contributing
Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
