terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "azurerm" {
  features {}
  subscription_id = "418e4379-1a2b-49d2-94fc-b7066d158961"
  tenant_id       = "38a1e0a1-b6b1-42e9-b3a9-597626670b17"
}