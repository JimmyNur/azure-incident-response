# Security Best Practices for Secrets Management

## 🔐 Overview
This document outlines best practices for managing secrets, API keys, and sensitive configuration in Azure incident response workflows.

## ⚠️ Critical Rules

### Never Commit Secrets to Git
- **NEVER** commit `.env` files with actual credentials
- **NEVER** hardcode secrets in source code
- **NEVER** commit API keys, passwords, or tokens
- **ALWAYS** use `.gitignore` to exclude sensitive files

### What to Exclude from Version Control
Add these patterns to your `.gitignore`:
```
.env
.env.local
*.env
credentials.json
secrets.json
*.key
*.pem
*.p12
*.pfx
local.settings.json
```

## 🛡️ Azure-Specific Best Practices

### 1. Use Azure Key Vault
Store all secrets in Azure Key Vault instead of environment variables:

```bash
# Store a secret
az keyvault secret set --vault-name MyKeyVault --name StorageAccountKey --value "your-key"

# Retrieve a secret
az keyvault secret show --vault-name MyKeyVault --name StorageAccountKey --query value -o tsv
```

### 2. Use Managed Identities
Enable managed identities for Azure resources to eliminate the need for credentials:

```bash
# Enable system-assigned managed identity for Logic App
az logicapp identity assign --name MyLogicApp --resource-group MyRG
```

### 3. Use Azure RBAC
Implement role-based access control with least privilege:

```bash
# Grant minimum required permissions
az role assignment create \
  --assignee <managed-identity-principal-id> \
  --role "Storage Blob Data Contributor" \
  --scope /subscriptions/{sub-id}/resourceGroups/{rg}/providers/Microsoft.Storage/storageAccounts/{account}
```

## 🔄 Secret Rotation

### Regular Rotation Schedule
- **Storage Account Keys**: Rotate every 90 days
- **Service Principal Secrets**: Rotate every 90 days
- **Personal Access Tokens**: Rotate every 30 days
- **API Keys**: Rotate based on vendor recommendations

### Rotation Process
1. Generate new credentials
2. Update Key Vault with new values
3. Test applications with new credentials
4. Revoke old credentials
5. Document rotation in audit log

## 🚨 Incident Response for Exposed Secrets

If secrets are accidentally committed:

### Immediate Actions
1. **Revoke the exposed credentials immediately**
2. **Generate new credentials**
3. **Update all systems using the old credentials**
4. **Remove secrets from Git history**

### Remove from Git History
```bash
# Use BFG Repo-Cleaner or git-filter-repo
git filter-repo --path .env --invert-paths
git push --force
```

### Report the Incident
- Notify security team
- Document in incident log
- Review and update access controls
- Conduct post-incident review

## 📋 Environment Variable Setup

### For Local Development
1. Copy `.env.example` to `.env`
2. Fill in your development values
3. Verify `.env` is in `.gitignore`
4. Never share your `.env` file

### For Production
1. Use Azure Key Vault for all secrets
2. Configure managed identities
3. Use Azure App Configuration for non-sensitive settings
4. Enable audit logging

## 🔍 Detection and Prevention

### Pre-commit Hooks
Install git-secrets or similar tools:

```bash
# Install git-secrets
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
make install

# Configure for Azure patterns
git secrets --register-azure
```

### Secret Scanning
Use tools to scan for exposed secrets:
- GitHub Advanced Security (Secret Scanning)
- Azure DevOps Credential Scanner
- TruffleHog
- GitGuardian

### Code Review Checklist
- [ ] No hardcoded credentials
- [ ] No API keys in code
- [ ] All sensitive config uses Key Vault
- [ ] Managed identities configured
- [ ] Least privilege access implemented
- [ ] Audit logging enabled

## 📚 Additional Resources

- [Azure Key Vault Best Practices](https://docs.microsoft.com/azure/key-vault/general/best-practices)
- [Managed Identities for Azure Resources](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/)
- [Azure Security Baseline](https://docs.microsoft.com/security/benchmark/azure/)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

## ✅ Verification Checklist

Before deploying:
- [ ] All secrets stored in Key Vault
- [ ] No `.env` files in repository
- [ ] `.gitignore` properly configured
- [ ] Managed identities enabled
- [ ] RBAC roles assigned (least privilege)
- [ ] Audit logging configured
- [ ] Secret rotation schedule documented
- [ ] Incident response plan updated
