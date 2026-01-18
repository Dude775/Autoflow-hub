import { Router, Request, Response } from 'express';
import {
  getAllWorkflows,
  getWorkflowById,
  getWorkflowsByCategory,
  recordPurchase
} from '../database/db';
import { PurchaseRequest } from '../types';

const router = Router();

// GET /api/workflows - קבלת כל ה-workflows (עם אפשרות filter לפי category)
router.get('/workflows', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    let workflows;
    
    if (category && typeof category === 'string') {
      // סינון לפי קטגוריה
      workflows = await getWorkflowsByCategory(category);
      console.log(`📂 Fetched ${workflows.length} workflows from category: ${category}`);
    } else {
      // קבלת כל ה-workflows
      workflows = await getAllWorkflows();
      console.log(`📋 Fetched ${workflows.length} total workflows`);
    }

    // המרת tags מ-JSON string ל-array
    const workflowsWithParsedTags = workflows.map(workflow => ({
      ...workflow,
      tags: JSON.parse(workflow.tags || '[]')
    }));

    res.json({
      success: true,
      count: workflowsWithParsedTags.length,
      data: workflowsWithParsedTags
    });

  } catch (error) {
    console.error('❌ Error fetching workflows:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch workflows',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/workflows/:id - קבלת workflow ספציפי
router.get('/workflows/:id', async (req: Request, res: Response) => {
  try {
    const workflowId = parseInt(req.params.id);

    if (isNaN(workflowId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid workflow ID'
      });
    }

    const workflow = await getWorkflowById(workflowId);

    if (!workflow) {
      return res.status(404).json({
        success: false,
        error: 'Workflow not found'
      });
    }

    // המרת tags מ-JSON string ל-array
    const workflowWithParsedTags = {
      ...workflow,
      tags: JSON.parse(workflow.tags || '[]')
    };

    console.log(`✅ Fetched workflow: ${workflow.title}`);

    res.json({
      success: true,
      data: workflowWithParsedTags
    });

  } catch (error) {
    console.error('❌ Error fetching workflow:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch workflow',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/purchase - רישום רכישה
router.post('/purchase', async (req: Request, res: Response) => {
  try {
    const { workflow_id, email }: PurchaseRequest = req.body;

    // ולידציה
    if (!workflow_id || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: workflow_id and email'
      });
    }

    // בדיקה שהמייל תקין
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // בדיקה שה-workflow קיים
    const workflow = await getWorkflowById(workflow_id);
    if (!workflow) {
      return res.status(404).json({
        success: false,
        error: 'Workflow not found'
      });
    }

    // רישום הרכישה
    const purchaseId = await recordPurchase({ workflow_id, email });

    console.log(`💰 Purchase recorded: ${email} bought "${workflow.title}"`);

    res.json({
      success: true,
      message: 'Purchase completed successfully',
      data: {
        purchase_id: purchaseId,
        workflow_title: workflow.title,
        download_url: workflow.download_url
      }
    });

  } catch (error) {
    console.error('❌ Error processing purchase:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process purchase',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;