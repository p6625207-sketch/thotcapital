<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class NoticiasController extends Controller
{
    public function getNews()
    {
        $news = News::with('category')
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'title' => $item->title,
                    'excerpt' => $item->excerpt,
                    'date' => $item->date_text,
                    'image' => $item->image_url,
                    'link' => $item->link,
                    'category' => $item->category->name ?? 'GENERAL',
                ];
            });

        return response()->json($news);
    }
}
