import { NextRequest, NextResponse } from 'next/server';
import { getAllGuides, getGuidesByCategory, getFeaturedGuides } from '@/lib/markdown-loader';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';

    let guides;
    
    if (featured) {
      guides = getFeaturedGuides();
    } else if (category) {
      guides = getGuidesByCategory(category);
    } else {
      guides = getAllGuides();
    }

    return NextResponse.json({
      success: true,
      data: guides,
      total: guides.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('가이드 API 오류:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guides' },
      { status: 500 }
    );
  }
}