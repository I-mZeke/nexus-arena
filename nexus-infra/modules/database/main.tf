variable "vpc_id" {}
variable "private_subnet_ids" { type = list(string) }
variable "db_password" {}
variable "env" {}

resource "aws_db_subnet_group" "nexus" {
  name       = "nexus-db-subnet-group"
  subnet_ids = var.private_subnet_ids
  tags       = { Name = "nexus-db-subnet-group" }
}

resource "aws_security_group" "db_sg" {
  name        = "nexus-db-sg"
  description = "Security group para RDS PostgreSQL"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "nexus-db-sg", Environment = var.env }
}

resource "aws_db_instance" "postgres" {
  identifier        = "nexus-arena-db"
  engine            = "postgres"
  engine_version    = "15.4"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  db_name           = "nexus_arena"
  username          = "nexus_user"
  password          = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.nexus.name
  vpc_security_group_ids = [aws_security_group.db_sg.id]
  multi_az               = true
  skip_final_snapshot    = true

  tags = { Name = "nexus-rds", Environment = var.env }
}

output "db_endpoint" {
  value = aws_db_instance.postgres.endpoint
}