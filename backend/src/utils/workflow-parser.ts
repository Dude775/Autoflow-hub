interface N8NNode {
  type: string;
  name: string;
  parameters?: any;
}

interface N8NWorkflow {
  name?: string;
  nodes: N8NNode[];
  connections?: any;
  settings?: any;
  meta?: any;
}

export function extractTitle(filename: string): string {
  const baseName = filename.replace('.json', '');
  
  const title = baseName
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return title;
}

export function extractDescription(workflowJson: N8NWorkflow): string {
  if (workflowJson.nodes && Array.isArray(workflowJson.nodes)) {
    const stickyNote = workflowJson.nodes.find(
      (node: any) => node.type === 'n8n-nodes-base.stickyNote'
    );
    
    if (stickyNote?.parameters?.content) {
      const content = stickyNote.parameters.content
        .replace(/<[^>]*>/g, '')
        .trim();
      
      if (content.length > 0) {
        return content.length > 500 
          ? content.substring(0, 500) + '...' 
          : content;
      }
    }
  }
  
  if (workflowJson.meta && typeof workflowJson.meta === 'object') {
    const meta = workflowJson.meta as any;
    if (meta.description) {
      return meta.description;
    }
  }
  
  if (workflowJson.name) {
    return `${workflowJson.name} - אוטומציה מתקדמת עם N8N`;
  }
  
  return 'אוטומציה מתקדמת עם N8N. Workflow זה מאפשר ביצוע משימות אוטומטיות ושיפור תהליכי עבודה.';
}

export function detectCategory(workflowJson: N8NWorkflow): string {
  if (!workflowJson.nodes || !Array.isArray(workflowJson.nodes)) {
    return 'Automation';
  }

  const nodeTypes = workflowJson.nodes.map(node => node.type.toLowerCase());
  const nodeTypesStr = nodeTypes.join(' ');

  if (
    nodeTypesStr.includes('linkedin') ||
    nodeTypesStr.includes('twitter') ||
    nodeTypesStr.includes('facebook') ||
    nodeTypesStr.includes('instagram') ||
    nodeTypesStr.includes('social')
  ) {
    return 'Social Media';
  }

  if (
    nodeTypesStr.includes('gmail') ||
    nodeTypesStr.includes('email') ||
    nodeTypesStr.includes('imap') ||
    nodeTypesStr.includes('smtp') ||
    nodeTypesStr.includes('outlook')
  ) {
    return 'Email';
  }

  if (
    nodeTypesStr.includes('hubspot') ||
    nodeTypesStr.includes('salesforce') ||
    nodeTypesStr.includes('pipedrive') ||
    nodeTypesStr.includes('crm')
  ) {
    return 'CRM';
  }

  if (
    nodeTypesStr.includes('sheets') ||
    nodeTypesStr.includes('airtable') ||
    nodeTypesStr.includes('excel') ||
    nodeTypesStr.includes('csv') ||
    nodeTypesStr.includes('spreadsheet')
  ) {
    return 'Data Processing';
  }

  if (
    nodeTypesStr.includes('stripe') ||
    nodeTypesStr.includes('paypal') ||
    nodeTypesStr.includes('invoice') ||
    nodeTypesStr.includes('quickbooks')
  ) {
    return 'Finance';
  }

  if (
    nodeTypesStr.includes('mailchimp') ||
    nodeTypesStr.includes('sendinblue') ||
    nodeTypesStr.includes('campaign') ||
    nodeTypesStr.includes('marketing')
  ) {
    return 'Marketing';
  }

  if (
    nodeTypesStr.includes('slack') ||
    nodeTypesStr.includes('notion') ||
    nodeTypesStr.includes('trello') ||
    nodeTypesStr.includes('asana') ||
    nodeTypesStr.includes('calendar')
  ) {
    return 'Productivity';
  }

  return 'Automation';
}

export function extractTags(workflowJson: N8NWorkflow): string[] {
  const tags = new Set<string>(['N8N', 'Real-Workflow']);

  if (!workflowJson.nodes || !Array.isArray(workflowJson.nodes)) {
    return Array.from(tags);
  }

  const nodeTypeToTag: { [key: string]: string } = {
    'gmail': 'Gmail',
    'email': 'Email',
    'slack': 'Slack',
    'hubspot': 'HubSpot',
    'salesforce': 'Salesforce',
    'sheets': 'Google Sheets',
    'airtable': 'Airtable',
    'linkedin': 'LinkedIn',
    'twitter': 'Twitter',
    'facebook': 'Facebook',
    'stripe': 'Stripe',
    'openai': 'AI',
    'anthropic': 'AI',
    'webhook': 'Webhooks',
    'http': 'HTTP',
    'postgres': 'PostgreSQL',
    'mysql': 'MySQL',
    'mongodb': 'MongoDB',
    'redis': 'Redis',
    'aws': 'AWS',
    'googlecloud': 'Google Cloud',
    'azure': 'Azure',
    'schedule': 'Scheduled',
    'cron': 'Scheduled'
  };

  workflowJson.nodes.forEach(node => {
    const nodeType = node.type.toLowerCase();
    
    Object.keys(nodeTypeToTag).forEach(key => {
      if (nodeType.includes(key)) {
        tags.add(nodeTypeToTag[key]);
      }
    });

    if (nodeType.includes('ai') || nodeType.includes('gpt') || nodeType.includes('claude')) {
      tags.add('AI');
    }

    if (nodeType.includes('webhook') || nodeType.includes('http')) {
      tags.add('Integration');
    }
  });

  const allTags = Array.from(tags);
  const baseTags = ['N8N', 'Real-Workflow'];
  const additionalTags = allTags.filter(tag => !baseTags.includes(tag)).slice(0, 6);
  
  return [...baseTags, ...additionalTags];
}

export function validateWorkflowJson(workflowJson: any): boolean {
  if (!workflowJson || typeof workflowJson !== 'object') {
    return false;
  }

  if (!Array.isArray(workflowJson.nodes)) {
    return false;
  }

  if (workflowJson.nodes.length === 0) {
    return false;
  }

  const allNodesValid = workflowJson.nodes.every((node: any) => {
    return node && typeof node === 'object' && typeof node.type === 'string';
  });

  return allNodesValid;
}

export function getWorkflowStats(workflowJson: N8NWorkflow): {
  nodeCount: number;
  hasAI: boolean;
  hasSchedule: boolean;
  complexity: 'Simple' | 'Medium' | 'Complex';
} {
  const nodeCount = workflowJson.nodes?.length || 0;
  
  const nodeTypes = workflowJson.nodes?.map(n => n.type.toLowerCase()).join(' ') || '';
  const hasAI = nodeTypes.includes('openai') || nodeTypes.includes('anthropic') || nodeTypes.includes('ai');
  const hasSchedule = nodeTypes.includes('schedule') || nodeTypes.includes('cron');
  
  let complexity: 'Simple' | 'Medium' | 'Complex' = 'Simple';
  if (nodeCount > 15) {
    complexity = 'Complex';
  } else if (nodeCount > 7) {
    complexity = 'Medium';
  }

  return {
    nodeCount,
    hasAI,
    hasSchedule,
    complexity
  };
}