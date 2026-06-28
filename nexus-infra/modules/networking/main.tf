variable "vpc_cidr" {}
variable "env" {}

resource "aws_vpc" "nexus_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = { Name = "nexus-arena-vpc", Environment = var.env }
}

resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.nexus_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
  tags = { Name = "nexus-public-a" }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.nexus_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
  tags = { Name = "nexus-public-b" }
}

resource "aws_subnet" "private_db_a" {
  vpc_id            = aws_vpc.nexus_vpc.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "us-east-1a"
  tags = { Name = "nexus-private-db-a" }
}

resource "aws_subnet" "private_db_b" {
  vpc_id            = aws_vpc.nexus_vpc.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "us-east-1b"
  tags = { Name = "nexus-private-db-b" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.nexus_vpc.id
  tags   = { Name = "nexus-igw" }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.nexus_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = { Name = "nexus-public-rt" }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public_rt.id
}

output "vpc_id" {
  value = aws_vpc.nexus_vpc.id
}

output "public_subnet_ids" {
  value = [aws_subnet.public_a.id, aws_subnet.public_b.id]
}

output "private_subnet_ids" {
  value = [aws_subnet.private_db_a.id, aws_subnet.private_db_b.id]
}