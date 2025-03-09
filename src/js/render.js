import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer.js";
import LabelClass from "@arcgis/core/layers/support/LabelClass.js";
var bodyrender = new ClassBreaksRenderer({ field: 'isclean', legendOptions: { title: ' ' } })
bodyrender.addClassBreakInfo({
  minValue: 0,
  maxValue: 0.5,
  label: '未清理',
  symbol: {
    type: "simple-line",
    color: [255, 255, 255],
    width: "5px",
  },

})
bodyrender.addClassBreakInfo({
  minValue: 0.5,
  maxValue: 3,
  label: '已清理',
  symbol: {
    type: "simple-line",
    color: [0, 0, 0],
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
var poprender = new ClassBreaksRenderer({ field: 'people', legendOptions: { title: ' ' } })
poprender.addClassBreakInfo({
  minValue: 1,
  maxValue: 500,
  symbol: {
    type: 'picture-marker',
    url: '/public/pop4.png',
    size: '3px',
  }
})
poprender.addClassBreakInfo({
  minValue: 500,
  maxValue: 1000,

  symbol: {
    type: 'picture-marker',
    url: '/public/pop3.png',
    size: '3px',

  }
})
poprender.addClassBreakInfo({
  minValue: 1000,
  maxValue: 40000,
  symbol: {
    type: 'picture-marker',
    url: '/public/pop1.png',
    size: '3px',

  }
})
poprender.addClassBreakInfo({
  minValue: 40000,
  maxValue: 50000,
  symbol: {
    type: 'picture-marker',
    url: '/public/pop2.png',
    size: '3px',
  }
})
var gridfirstrender = {
  type: 'simple',
  symbol: {
    type: "simple-fill",  // autocasts as new SimpleMarkerSymbol()
    color: [255, 255, 255, 0],
    outline: {  // autocasts as new SimpleLineSymbol()
      color: 'grey',
      width: 0.5,

    }
  }
}
var griddensity = new ClassBreaksRenderer({ field: 'people', legendOptions: { title: ' ' } })
griddensity.addClassBreakInfo({
  minValue: 0,
  maxValue: 5000,
  symbol: {
    type: 'simple-fill',
    color: [0, 255, 127, 0.5],
    outline: {  // autocasts as new SimpleLineSymbol()
      color: 'grey',
      width: 0.5,

    }
  },

})
griddensity.addClassBreakInfo({
  minValue: 5000,
  maxValue: 10000,

  symbol: {
    type: 'simple-fill',
    color: [173, 255, 47, 0.5],
    outline: {  // autocasts as new SimpleLineSymbol()
      color: 'grey',
      width: 0.5,

    }
  }

})
griddensity.addClassBreakInfo({
  minValue: 10000,
  maxValue: 20000,

  symbol: {
    color: [255, 255, 0, 0.5],
    type: 'simple-fill',
    outline: {  // autocasts as new SimpleLineSymbol()
      color: 'grey',
      width: 0.5,
    }
  }
})
griddensity.addClassBreakInfo({
  minValue: 20000,
  maxValue: 50000,

  symbol: {
    color: [255, 140, 0, 0.5],
    type: 'simple-fill',
    outline: {  // autocasts as new SimpleLineSymbol()
      color: 'grey',
      width: 0.5,

    }
  }
})
griddensity.addClassBreakInfo({
  minValue: 50000,
  maxValue: 500000,
  symbol: {
    color: [255, 69, 0, 0.5],
    type: 'simple-fill',
    outline: {  // autocasts as new SimpleLineSymbol()
      color: 'grey',
      width: 1
    }
  }
})
var synthesis = new ClassBreaksRenderer({ field: 'classify', legendOptions: { title: ' ' } })
synthesis.addClassBreakInfo({
  minValue: 0,
  maxValue: 1,
  label: '一级',
  symbol: {
    type: "simple-line",
    color: [0, 255, 127],
    width: "5px",
  }
})
synthesis.addClassBreakInfo({
  minValue: 1,
  maxValue: 2,
  label: '二级',
  symbol: {
    type: "simple-line",
    color: [173, 255, 47],
    width: "5px",
  }

})
synthesis.addClassBreakInfo({
  minValue: 2,
  maxValue: 3,
  label: '三级',
  symbol: {
    color: [255, 255, 0],
    type: "simple-line",
    width: "5px",
  }
})
synthesis.addClassBreakInfo({
  minValue: 3,
  maxValue: 4,
  label: '四级',
  symbol: {
    color: [255, 140, 0],
    type: "simple-line",
    width: "5px",
  }
})
synthesis.addClassBreakInfo({
  minValue: 4,
  maxValue: 100,
  label: '五级',
  symbol: {
    color: [255, 69, 0],
    type: "simple-line",
    width: "5px",
  }
})

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