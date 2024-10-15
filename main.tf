provider "google" {
  credentials = file("ecommerce-test-437909-c1c92f08d4ba.json")  
  project     = "ecommerce-test-437909"
  region      = "us-central1"  # Change as needed
}

# Create a GKE Cluster
resource "google_container_cluster" "primary" {
  name     = "gke-cluster"
  location = "us-central1"

  node_config {
    machine_type = "e2-medium"  # Default machine type
  }

  initial_node_count = 3

  # Optional: enable auto-scaling
  autoscaling {
    min_node_count = 1
    max_node_count = 5
  }

  # Enable basic monitoring and logging
  monitoring_service = "monitoring.googleapis.com/kubernetes"
  logging_service    = "logging.googleapis.com/kubernetes"
}

# Deploy the frontend application to the GKE cluster
resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend-deployment"
    namespace = "default"
  }

  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "frontend"
      }
    }
    template {
      metadata {
        labels = {
          app = "frontend"
        }
      }
      spec {
        container {
          image = "gcr.io/ecommerce-test-437909/ecom-frontend:latest"  
          name  = "frontend-container"

          port {
            container_port = 3000  # Frontend app port
          }
        }
      }
    }
  }
}

# Deploy the backend application to the GKE cluster
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend-deployment"
    namespace = "default"
  }

  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "backend"
      }
    }
    template {
      metadata {
        labels = {
          app = "backend"
        }
      }
      spec {
        container {
          image = "gcr.io/ecommerce-test-437909/ecom-backend:latest"  
          name  = "backend-container"

          port {
            container_port = 5000  # Backend app port
          }
        }
      }
    }
  }
}

# Expose the frontend as a NodePort service
resource "kubernetes_service" "frontend-service" {
  metadata {
    name = "frontend-service"
  }
  spec {
    selector = {
      app = "frontend"
    }
    type = "NodePort"
    port {
      port        = 80
      target_port = 3000
      node_port   = 30001  
    }
  }
}

# Expose the backend as a NodePort service
resource "kubernetes_service" "backend-service" {
  metadata {
    name = "backend-service"
  }
  spec {
    selector = {
      app = "backend"
    }
    type = "NodePort"
    port {
      port        = 80
      target_port = 5000
      node_port   = 30002  # Choose NodePort in the range 30000-32767
    }
  }
}

# Create Ingress to expose frontend and backend services
resource "kubernetes_ingress" "app-ingress" {
  metadata {
    name = "app-ingress"
  }
  spec {
    backend {
      service_name = kubernetes_service.backend-service.metadata[0].name
      service_port = 80
    }

    rule {
      http {
        path {
          path = "/frontend"
          backend {
            service_name = kubernetes_service.frontend-service.metadata[0].name
            service_port = 80
          }
        }
      }
    }
  }
}

# Output the GKE cluster endpoint
output "gke_cluster_endpoint" {
  value = google_container_cluster.primary.endpoint
}

# Output the GKE cluster name
output "gke_cluster_name" {
  value = google_container_cluster.primary.name
}
