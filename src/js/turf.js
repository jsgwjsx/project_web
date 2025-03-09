import {point,polygon,multiLineString,polygon} from '@turf/turf'
import Polygon from "@arcgis/core/geometry/Polygon.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";
import Multipoint from "@arcgis/core/geometry/Multipoint.js";
import Point from "@arcgis/core/geometry/Point.js";
var TurfToGeometry = function (turf) {
    var geometry = null;
    if (turf.type =="Feature"){				
        var coordinate=turf.geometry.coordinates;
        switch (turf.geometry.type) {
            case "MultiLineString":
                geometry=new Polyline({"paths":coordinate,"spatialReference":({" wkid":4326 })});
                break;
            case "LineString":
                geometry=new Polyline({"paths":[coordinate],"spatialReference":({" wkid":4326 })});
                break;
            case "MultiPoint":
                geometry =new Multipoint({"points":coordinate,"spatialReference":({" wkid":4326 })});
                break;
            case "Point":
                geometry = new Point({"x":coordinate[0], "y":coordinate[1], "spatialReference":({" wkid":4326 })});
                break;
            case "Polygon":
                geometry=new Polygon({"rings":coordinate,"spatialReference":({" wkid":4326 })});
                break;
            default:
                geometry = null;
        }
    }
    else if(turf.type=="FeatureCollection"){
            geometry=[];
            turf.features.forEach(function(item,index){
                geometry[index]=TurfToGeometry(item);
            })
    }
    
    return geometry;
}
var GeometryToTurf = function (geometry) {
    var tfgeometry=null;
    switch (geometry.type) {
        case "point":
            tfgeometry= point([geometry.x, geometry.y]);
            break;
        case "extent":
            tfgeometry=polygon([[[geometry.xmin,geometry.ymin],[geometry.xmin,geometry.ymax],[geometry.xmax,geometry.ymax],[geometry.xmax,geometry.ymin]]])                       
            break;
        case "polyline":
            tfgeometry=multiLineString(geometry.paths);
            break;
        case "polygon":
            tfgeometry=polygon(geometry.paths);
            break;
        default:
            tfgeometry = null;
    }
   
    return tfgeometry;
}
export {TurfToGeometry,GeometryToTurf}