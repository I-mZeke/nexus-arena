module "networking" {
  source   = "./modules/networking"
  vpc_cidr = var.vpc_cidr
  env      = var.env
}

module "database" {
  source             = "./modules/database"
  vpc_id             = module.networking.vpc_id
  private_subnet_ids = module.networking.private_subnet_ids
  db_password        = var.db_password
  env                = var.env
}

module "compute" {
  source            = "./modules/compute"
  vpc_id            = module.networking.vpc_id
  public_subnet_ids = module.networking.public_subnet_ids
  env               = var.env
}

module "azure" {
  source      = "./modules/azure"
  env         = var.env
  db_password = var.db_password
  tenant_id   = var.tenant_id
}