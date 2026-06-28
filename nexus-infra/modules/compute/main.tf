variable "vpc_id" {}
variable "public_subnet_ids" { type = list(string) }
variable "env" {}

# Security Group para las instancias EC2
resource "aws_security_group" "app_sg" {
  name        = "nexus-app-sg"
  description = "Security group para contenedores NEXUS ARENA"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "nexus-app-sg", Environment = var.env }
}

# Application Load Balancer
resource "aws_lb" "nexus_alb" {
  name               = "nexus-arena-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.app_sg.id]
  subnets            = var.public_subnet_ids

  tags = { Name = "nexus-alb", Environment = var.env }
}

# Target Group
resource "aws_lb_target_group" "nexus_tg" {
  name     = "nexus-arena-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    path                = "/"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 30
  }

  tags = { Name = "nexus-tg" }
}

# Listener del ALB
resource "aws_lb_listener" "nexus_listener" {
  load_balancer_arn = aws_lb.nexus_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.nexus_tg.arn
  }
}

output "alb_dns_name" {
  value = aws_lb.nexus_alb.dns_name
}

output "target_group_arn" {
  value = aws_lb_target_group.nexus_tg.arn
}

output "app_sg_id" {
  value = aws_security_group.app_sg.id
}