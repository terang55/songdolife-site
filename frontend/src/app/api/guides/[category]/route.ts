import { NextRequest, NextResponse } from 'next/server';
import { getGuidesByCategory } from '@/lib/server-markdown-loader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    const guides = getGuidesByCategory(category);
    
    return NextResponse.json({
      success: true,
      data: guides,
      total: guides.length
    });
  } catch (error) {
    console.error('카테고리 가이드 API 오류:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}