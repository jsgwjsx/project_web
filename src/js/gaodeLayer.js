import BaseTileLayer from "@arcgis/core/layers/BaseTileLayer";
import esriRequest from "@arcgis/core/request";
const GaodeLayer = BaseTileLayer.createSubclass({
        properties: {
            urlTemplate: null,
        },
        getTileUrl: function(level, row, col) {  
            // 矢量地图没有标注
            // return 'https://webrd0' + (col % 4 + 1) + '.is.autonavi.com/appmaptile?lang=zh_cn&amp;size=1&amp;scale=1&amp;style=8&amp;x={x}&amp;y={y}&amp;z={z}&amp;scl=2&amp;ltype=7&amp;key=#'.replace("{z}", level).replace("{x}", col).replace("{y}", row);  
            // 矢量地图标注
            return 'https://webrd0' + (col % 4 + 1) +    '.is.autonavi.com/appmaptile?lang=zh_cn&amp;size=1&amp;scale=1&amp;style=8&amp;x={x}&amp;y={y}&amp;z={z}&amp;scl=1&amp;ltype=7&amp;key=275ccc01069ccdb142f46282d65100c3'.replace("{z}", level).replace("{x}", col).replace("{y}", row); 
            // 影像地图
            // return  'http://webst0' + (col % 4 + 1) + '.is.autonavi.com/appmaptile?style=6&amp;x={x}&amp;y={y}&amp;z={z}&amp;key=#'.replace("{z}", level).replace("{x}", col).replace("{y}", row);
            // 道路带注记
            // return 'http://webst0' + (col % 4 + 1) +   '.is.autonavi.com/appmaptile?x={x}&amp;y={y}&amp;z={z}&amp;lang=zh_cn&amp;size=1&amp;scale=1&amp;style=8&amp;ltype=7&amp;key=#'.replace("{z}", level).replace("{x}", col).replace("{y}", row);
            // 道路不带注记
            // return 'http://wprd0' + (col % 4 + 1) + '.is.autonavi.com/appmaptile?x={x}&amp;y={y}&amp;z={z}&amp;lang=zh_cn&amp;size=1&amp;scl=1&amp;style=8&amp;ltype=11&amp;key=#'.replace("{z}", level).replace("{x}", col).replace("{y}", row);
        },
        fetchTile: function(level, row, col) {
            var url = this.getTileUrl(level, row, col);
            return esriRequest(url, {
                responseType: "image"
            })
            .then(function(response) {
                var image = response.data;
                var width = this.tileInfo.size[0];
                var height = this.tileInfo.size[0];
                var canvas = document.createElement("canvas");
                var context = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;
                context.drawImage(image, 0, 0, width, height);
                return canvas;
            }.bind(this));
        },
    });
export {
    GaodeLayer
}
