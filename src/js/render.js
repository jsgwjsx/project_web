import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import LabelClass from "@arcgis/core/layers/support/LabelClass.js";
var bodyrender = new ClassBreaksRenderer({ field: 'isclean', legendOptions: { title: ' ' } })
bodyrender.addClassBreakInfo({
  minValue: 0,
  maxValue: 0.5,
  label: '未清理',
  symbol: {
    type: "simple-line",
    color:[127, 127, 127],
    width: "5px",
  },

})
bodyrender.addClassBreakInfo({
  minValue: 0.5,
  maxValue: 3,
  label: '已清理',
  symbol: {
    type: "simple-line",
    color: [0, 176, 240],
    width: "5px",
  }

})


var gridrender = {
  type: 'simple',
  symbol: {
    type: "simple-line",  // autocasts as new SimpleMarkerSymbol()
    color: 'white',
    width: "5px",
  }
}
// type: "simple-marker",  //点符号类型(一般为SimpleMarkerSymbol, PictureMarkerSymbol 和 TextSymbol等)
// color: '#00ccff',  //符号颜色
// outline: {  //轮廓设置
//     color: [255, 255, 255], //轮廓颜色
//     width: 1  //轮廓宽度
// }
var employeerender = new ClassBreaksRenderer({ field: 'groupid', legendOptions: { title: ' ' } })
employeerender.addClassBreakInfo({
  minValue: 0,
  maxValue: 0,
  symbol: {
    type: 'picture-marker',
    url: '/public/pop4.png',
    size: '3px',
  }
})
employeerender.addClassBreakInfo({
  minValue: 1,
  maxValue: 100000,
  symbol: {
    type: 'picture-marker',
    url: '/public/pop1.png',
    size: '3px',
  }
})
// type: "simple-marker",  //点符号类型(一般为SimpleMarkerSymbol, PictureMarkerSymbol 和 TextSymbol等)
// color: '#00ccff',  //符号颜色
// outline: {  //轮廓设置
//     color: [255, 255, 255], //轮廓颜色
//     width: 1  //轮廓宽度
// }
// var poprender = new ClassBreaksRenderer({ field: 'people', legendOptions: { title: ' ' } })
// poprender.addClassBreakInfo({
//   minValue: 1,
//   maxValue: 500,
//   symbol: {
//     type: 'picture-marker',
//     url: '/public/pop4.png',
//     size: '3px',
//   }
// })
// poprender.addClassBreakInfo({
//   minValue: 500,
//   maxValue: 1000,

//   symbol: {
//     type: 'picture-marker',
//     url: '/public/pop3.png',
//     size: '3px',

//   }
// })
// poprender.addClassBreakInfo({
//   minValue: 1000,
//   maxValue: 40000,
//   symbol: {
//     type: 'picture-marker',
//     url: '/public/pop1.png',
//     size: '3px',

//   }
// })
// poprender.addClassBreakInfo({
//   minValue: 40000,
//   maxValue: 50000,
//   symbol: {
//     type: 'picture-marker',
//     url: '/public/pop2.png',
//     size: '3px',
//   }
// })

var poprender = new ClassBreaksRenderer({ 
  field: 'people', 
  legendOptions: { title: '人口密度分级' } 
});

// 1-500：深蓝基底
poprender.addClassBreakInfo({
  minValue: 1,
  maxValue: 500,
  symbol: {
    type: 'simple-marker',  // 替换为矢量标记
    size: 6,                // 像素单位，比图片更可控
    color: [30, 144, 255, 0.8],  // 科技蓝
    outline: {
      color: [67, 115, 158], // 统一轮廓色
      width: 0.7
    }
  }
})

// 500-1000：霓虹蓝
poprender.addClassBreakInfo({
  minValue: 500,
  maxValue: 1000,
  symbol: {
    type: 'simple-marker',
    size: 8,                // 稍大尺寸梯度
    color: [0, 191, 255, 0.9],  // 亮霓虹蓝
    outline: {
      color: [67, 115, 158],
      width: 0.7
    }
  }
})

// 1000-40000：警示黄
poprender.addClassBreakInfo({
  minValue: 1000,
  maxValue: 40000,
  symbol: {
    type: 'simple-marker',
    size: 10,
    color: [255, 215, 0, 0.9],  // 金黄色
    outline: {
      color: [200, 150, 0],    // 金色轮廓
      width: 1
    }
  }
})

// 40000-50000：高亮红
poprender.addClassBreakInfo({
  minValue: 40000,
  maxValue: 50000,
  symbol: {
    type: 'simple-marker',
    size: 12,                  // 最大级别
    color: [255, 36, 0, 0.95], // 高饱和红
    outline: {
      color: [150, 0, 0],     // 深红轮廓
      width: 1.2
    }
  }
})
var gridfirstrender = {
  type: 'simple',
  symbol: {
    type: "simple-fill",
    color: [255, 255, 255, 0],
    outline: {
      color: [67, 115, 158],  // 调整为深蓝色系
      width: 0.5
    }
  }
}

// var griddensity = new ClassBreaksRenderer({ field: 'people', legendOptions: { title: ' ' } })

// // 0-5k: 深蓝基底
// griddensity.addClassBreakInfo({
//   minValue: 0,
//   maxValue: 5000,
//   symbol: {
//     type: 'simple-fill',
//     color: [30, 144, 255, 0.6],  // 深科技蓝
//     outline: {
//       color: [67, 115, 158],
//       width: 0.5
//     }
//   }
// })

// // 5k-10k: 渐变为霓虹蓝
// griddensity.addClassBreakInfo({
//   minValue: 5000,
//   maxValue: 10000,
//   symbol: {
//     type: 'simple-fill',
//     color: [0, 191, 255, 0.65],  // 亮霓虹蓝
//     outline: {
//       color: [67, 115, 158],
//       width: 0.5
//     }
//   }
// })

// // 10k-20k: 青色过渡
// griddensity.addClassBreakInfo({
//   minValue: 10000,
//   maxValue: 20000,
//   symbol: {
//     color: [0, 255, 255, 0.7],  // 科技青
//     type: 'simple-fill',
//     outline: {
//       color: [67, 115, 158],
//       width: 0.5
//     }
//   }
// })

// // 20k-50k: 亮黄强调
// griddensity.addClassBreakInfo({
//   minValue: 20000,
//   maxValue: 50000,
//   symbol: {
//     color: [225, 255, 0, 0.75],  // 亮科技黄
//     type: 'simple-fill',
//     outline: {
//       color: [67, 115, 158],
//       width: 0.5
//     }
//   }
// })

// // 50k-500k: 警示红
// griddensity.addClassBreakInfo({
//   minValue: 50000,
//   maxValue: 500000,
//   symbol: {
//     color: [255, 36, 0, 0.8],  // 高亮警示红
//     type: 'simple-fill',
//     outline: {
//       color: [150, 50, 50],  // 加深轮廓色
//       width: 1
//     }
//   }
// })
var griddensity = new ClassBreaksRenderer({ 
  field: 'people', 
  legendOptions: { title: ' ' } 
});

// 荧光效果配置
const neonOutline = {
  outline: {
    color: [255, 255, 255, 0.8], // 白色光晕轮廓
    width: 0.5 // 进一步缩小轮廓宽度
  }
};

// 0-5k: 深蓝基底
griddensity.addClassBreakInfo({
  minValue: 0,
  maxValue: 5000,
  symbol: {
    type: 'simple-fill',
    color: [30, 144, 255, 0.5],  // 深科技蓝，降低透明度
    ...neonOutline // 应用荧光效果
  }
});

// 5k-10k: 渐变为霓虹蓝
griddensity.addClassBreakInfo({
  minValue: 5000,
  maxValue: 10000,
  symbol: {
    type: 'simple-fill',
    color: [0, 191, 255, 0.55],  // 亮霓虹蓝，降低透明度
    ...neonOutline // 应用荧光效果
  }
});

// 10k-20k: 青色过渡
griddensity.addClassBreakInfo({
  minValue: 10000,
  maxValue: 20000,
  symbol: {
    type: 'simple-fill',
    color: [0, 255, 255, 0.6],  // 科技青，降低透明度
    ...neonOutline // 应用荧光效果
  }
});

// 20k-50k: 亮黄强调
griddensity.addClassBreakInfo({
  minValue: 20000,
  maxValue: 50000,
  symbol: {
    type: 'simple-fill',
    color: [225, 255, 0, 0.65],  // 亮科技黄，降低透明度
    ...neonOutline // 应用荧光效果
  }
});

// 50k-500k: 警示红
griddensity.addClassBreakInfo({
  minValue: 50000,
  maxValue: 500000,
  symbol: {
    type: 'simple-fill',
    color: [255, 36, 0, 0.7],  // 高亮警示红，降低透明度
    outline: {
      color: [255, 180, 180, 0.7], // 浅红色光晕，降低透明度
      width: 0.8 // 进一步缩小轮廓宽度
    }
  }
});
// var synthesis = new ClassBreaksRenderer({ field: 'classify', legendOptions: { title: ' ' } })
// synthesis.addClassBreakInfo({
//   minValue: 0,
//   maxValue: 1,
//   label: '一级',
//   symbol: {
//     type: "simple-line",
//     color: [0, 255, 127],
//     width: "5px",
//   }
// })
// synthesis.addClassBreakInfo({
//   minValue: 1,
//   maxValue: 2,
//   label: '二级',
//   symbol: {
//     type: "simple-line",
//     color: [173, 255, 47],
//     width: "5px",
//   }

// })
// synthesis.addClassBreakInfo({
//   minValue: 2,
//   maxValue: 3,
//   label: '三级',
//   symbol: {
//     color: [255, 255, 0],
//     type: "simple-line",
//     width: "5px",
//   }
// })
// synthesis.addClassBreakInfo({
//   minValue: 3,
//   maxValue: 4,
//   label: '四级',
//   symbol: {
//     color: [255, 140, 0],
//     type: "simple-line",
//     width: "5px",
//   }
// })
// synthesis.addClassBreakInfo({
//   minValue: 4,
//   maxValue: 100,
//   label: '五级',
//   symbol: {
//     color: [255, 69, 0],
//     type: "simple-line",
//     width: "5px",
//   }
// })
var synthesis = new ClassBreaksRenderer({
  field: 'classify',
  legendOptions: { title: '道路等级' }
});

synthesis.addClassBreakInfo({
  minValue: 0,
  maxValue: 1,
  label: '一级',
  symbol: {
    type: "simple-line",
    color: [255, 99, 71], // 番茄红，代表主要道路，鲜明突出
    width: "5px",
  }
});

synthesis.addClassBreakInfo({
  minValue: 1,
  maxValue: 2,
  label: '二级',
  symbol: {
    type: "simple-line",
    color: [255, 165, 0], // 橙色，代表次要道路，较为鲜明
    width: "5px",
  }
});

synthesis.addClassBreakInfo({
  minValue: 2,
  maxValue: 3,
  label: '三级',
  symbol: {
    type: "simple-line",
    color: [255, 215, 0], // 金色，代表普通道路
    width: "5px",
  }
});

synthesis.addClassBreakInfo({
  minValue: 3,
  maxValue: 4,
  label: '四级',
  symbol: {
    type: "simple-line",
    color: [173, 216, 230], // 淡蓝色，代表支路，与背景相似但有区分
    width: "5px",
  }
});

synthesis.addClassBreakInfo({
  minValue: 4,
  maxValue: 100,
  label: '五级',
  symbol: {
    type: "simple-line",
    color: [135, 206, 250], // 天蓝色，代表小路，与背景相似
    width: "5px",
  }
});
var poirender = {
  type: 'unique-value',
  field: "type",
  uniqueValueInfos:
    [{
      value: '交通设施服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop4.png',
        size: '1px',
      },
    },
    {
      value: '政府机构及社会团体',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop4.png',
        size: '1px',
      },

    },
    {
      value: '金融设施服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop4.png',
        size: '1px',
      },

    },
    {
      value: '科教文化服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop4.png',
        size: '1px',
      },

    },
    {
      value: '汽车服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop4.png',
        size: '1px',
      },

    },
    {
      value: '风景名胜',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop4.png',
        size: '1px',
      },

    },
    {
      value: '体育休闲服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop4.png',
        size: '1px',
      },

    },
    {
      value: '餐饮服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop3.png',
        size: '1px',
      },
    },
    {
      value: '住宿服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop2.png',
        size: '1px',
      },
    },
    {
      value: '商务住宅',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop2.png',
        size: '1px',
      },

    },
    {
      value: '生活服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop2.png',
        size: '1px',
      },

    },
    {
      value: '医疗保健服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop2.png',
        size: '1px',
      },

    },
    {
      value: '公司企业',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop2.png',
        size: '1px',
      },

    },
    {
      value: '购物服务',
      symbol: {
        type: 'picture-marker',
        url: '/public/pop1.png',
        size: '1px',
      },

    },


    ]
}
const statesLabelClass = new LabelClass({
  // 显示文本内容
  labelExpressionInfo: {
    expression:
      ' $feature.name '
  },
  repeatLabel:false,
  labelPlacement:'above-along',
  maxScale: 0,
  minScale: 25000,
  // 符号设置，文字设置
  symbol: {
    type: "text", // autocasts as new TextSymbol()
    color: "skyblue",
    haloColor: "black",
    // 调整多行文本的水平对齐方式。
    horizontalAlignment: "center",
    // 调整文本的垂直对齐方式。
    verticalAlignment: "middle",
    font: {  // autocast as new Font()
      size: 12,
      weight: "bold"
    },

  },
});

export { bodyrender, poprender, gridfirstrender, griddensity, gridrender, synthesis, poirender, employeerender, statesLabelClass }