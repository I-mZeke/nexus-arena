variable "env" {}
variable "db_password" {}
variable "tenant_id" {}

resource "azurerm_resource_group" "nexus_rg" {
  name     = "nexus-arena-rg"
  location = "East US"
  tags     = { Environment = var.env, Project = "NEXUS ARENA" }
}

resource "azurerm_postgresql_flexible_server" "nexus_db_dr" {
  name                   = "nexus-arena-db-dr"
  resource_group_name    = azurerm_resource_group.nexus_rg.name
  location               = azurerm_resource_group.nexus_rg.location
  version                = "15"
  administrator_login    = "nexus_admin"
  administrator_password = var.db_password
  storage_mb             = 32768
  sku_name               = "B_Standard_B1ms"
  backup_retention_days  = 7

  tags = { Environment = var.env, Role = "DR-Replica" }
}

resource "azurerm_postgresql_flexible_server_database" "nexus_db" {
  name      = "nexus_arena"
  server_id = azurerm_postgresql_flexible_server.nexus_db_dr.id
  collation = "en_US.utf8"
  charset   = "utf8"
}

resource "azurerm_storage_account" "nexus_storage" {
  name                     = "nexusarenadr"
  resource_group_name      = azurerm_resource_group.nexus_rg.name
  location                 = azurerm_resource_group.nexus_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  tags                     = { Environment = var.env }
}

resource "azurerm_storage_container" "nexus_container" {
  name                  = "nexus-assets"
  storage_account_name  = azurerm_storage_account.nexus_storage.name
  container_access_type = "blob"
}

output "db_dr_fqdn" {
  value = azurerm_postgresql_flexible_server.nexus_db_dr.fqdn
}

output "storage_account_name" {
  value = azurerm_storage_account.nexus_storage.name
}