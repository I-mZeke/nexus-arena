variable "aws_region" {
  description = "Región principal AWS"
  default     = "us-east-1"
}

variable "env" {
  description = "Ambiente"
  default     = "prod"
}

variable "vpc_cidr" {
  description = "CIDR de la VPC"
  default     = "10.0.0.0/16"
}

variable "db_password" {
  description = "Password de la BD PostgreSQL"
  sensitive   = true
}

variable "tenant_id" {
  description = "Azure Tenant ID"
  default     = "38a1e0a1-b6b1-42e9-b3a9-597626670b17"
}