// ממשקי TypeScript לכל הישויות במערכת

export interface Workflow {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  demo_url: string | null;
  download_url: string | null;
  created_at: string;
  tags: string; // JSON string של array
  downloads: number;
  rating: number;
  image_url: string | null;
}

export interface CreateWorkflowRequest {
  title: string;
  description: string;
  category: string;
  price: number;
  demo_url?: string;
  download_url?: string;
  tags?: string[];
}

export interface PurchaseRequest {
  workflow_id: number;
  email: string;
}

export interface Purchase {
  id: number;
  workflow_id: number;
  email: string;
  purchased_at: string;
}

export interface WorkflowWithParsedTags extends Omit<Workflow, 'tags'> {
  tags: string[];
}