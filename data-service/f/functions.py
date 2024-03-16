import pandas as pd
import geopandas as gpd
import h3pandas 
import h3
import json
import numpy as np
from shapely.geometry import Polygon,MultiPolygon,LineString,Point
import os
import osmnx as ox
from constants import INDEX_H3, PERENT_INDEX, OSM_TAGS, SAMPLE_JSON


TEST = True
BORDERS_GEOMETRY = gpd.read_file('/Users/ali.dag/ali-projects/tarsmart/find_home/gadm36_TUR_gpkg/gadm36_TUR.gpkg')

def get_city_polygon(city_name)->Polygon:
    """
    Return the city polygon in shapely polgon format
    """
    return BORDERS_GEOMETRY[BORDERS_GEOMETRY['NAME_1'] == city_name]

def get_polygon_hexagons(polygon)->list:
    """
    Return List of Hexagons within given polygon border
    """
    return polygon.h3.polyfill_resample(9).reset_index().to_list()

def score_osm_functions(CITY,FUNC):
    """
    get transportation locations
    add h3 indexes 
    aggregate to h3 and return df
    """
    all_scores = pd.DataFrame(columns=['perent_h3_index','key','score'])
    for urban_func in FUNC:
        filepath = f'data_functions/{CITY}_{urban_func}.geojson'
        if os.path.exists(filepath):
            osm_points = gpd.read_file(filepath)
            print('reading file from local...')
        else:
            tags = OSM_TAGS[urban_func]
            osm_points = ox.geometries_from_place(CITY, tags[0])
            osm_points = osm_points.reset_index()[['osmid','geometry']]
            osm_points.to_file(filepath)  # TODO handle this part with s3

        osm_points = gpd.GeoDataFrame(osm_points, geometry='geometry',crs="EPSG:4326")
        osm_points.geometry = osm_points.geometry.centroid

        osm_points['h3_index'] = osm_points['geometry'].apply(lambda x: h3.geo_to_h3(x.y,x.x,INDEX_H3))
        osm_points['perent_h3_index'] = osm_points['geometry'].apply(lambda x: h3.geo_to_h3(x.y,x.x,PERENT_INDEX))
        function_score = pd.DataFrame(osm_points.groupby('perent_h3_index').count()['h3_index']).reset_index()
        function_score['key'] = urban_func
        function_score.columns = ['perent_h3_index','score','key']
        all_scores = pd.concat([all_scores,function_score])

    return all_scores # TODO make this json



def score_fav_places(body):
    """
    get users fav locations with their weights 0-10
    add h3 indexes 
    return
    """

    if TEST:
        body = SAMPLE_JSON 
    return

def get_traffic_index():
    return

def get_rent_availability():
    return

def hexagon_scoring():
    return
