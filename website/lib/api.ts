const API_URL = process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://autoflow-hub-api.vercel.app');

// Types
export interface Workflow {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  demo_url: string | null;
  download_url: string | null;
  created_at: string;
  tags: string[];
  downloads: number;
  rating: number;
  image_url: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
  message?: string;
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  data?: {
    purchase_id: number;
    workflow_title: string;
    download_url: string | null;
  };
}

export async function getWorkflows() {
  try {
    const response = await fetch(`${API_URL}/api/workflows`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API Error] Status: ${response.status}`, errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('[API Critical Failure]:', error);
    throw error;
  }
}

// Get all workflows (with optional category filter)
export async function getAllWorkflows(category?: string): Promise<Workflow[]> {
  try {
    const url = category
      ? `${API_URL}/api/workflows?category=${encodeURIComponent(category)}`
      : `${API_URL}/api/workflows`;

    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[API Error] Status: ${response.status}`, errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: ApiResponse<Workflow[]> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Failed to fetch workflows');
    }

    return result.data;
  } catch (error) {
    console.error('[API Critical Failure]:', error);
    throw error;
  }
}

// Get specific workflow
export async function getWorkflowById(id: number): Promise<Workflow> {
  try {
    const response = await fetch(`${API_URL}/api/workflows/${id}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Workflow> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Workflow not found');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching workflow:', error);
    throw error;
  }
}

// Process purchase
export async function purchaseWorkflow(
  workflowId: number,
  email: string
): Promise<PurchaseResponse> {
  try {
    const response = await fetch(`${API_URL}/api/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workflow_id: workflowId,
        email: email,
      }),
    });

    const result: PurchaseResponse = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Purchase failed');
    }

    return result;
  } catch (error) {
    console.error('Error processing purchase:', error);
    throw error;
  }
}

// Get unique categories
export async function getCategories(): Promise<string[]> {
  try {
    const workflows = await getAllWorkflows();
    const categories = [...new Set(workflows.map(w => w.category))];
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
