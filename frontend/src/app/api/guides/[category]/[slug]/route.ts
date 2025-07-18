import { NextRequest, NextResponse } from 'next/server';
import { loadGuide } from '@/lib/server-markdown-loader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  try {
    const { category, slug } = await params;
    const guide = loadGuide(category, slug);
    
    if (!guide) {
      return NextResponse.json(
        { success: false, error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: guide
    });
  } catch (error) {
    console.error('가이드 API 오류:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}