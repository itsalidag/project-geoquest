from flask import Flask, request, jsonify
import h3pandas
import h3
import geopandas as gpd
from shapely.geometry import shape
import json
import functions as func

app = Flask(__name__)
city_data = gpd.read_file('/Users/ali.dag/ali-projects/tarsmart/find_home/gadm36_TUR_gpkg/gadm36_TUR.gpkg')

# Define a sample endpoint
@app.route('/hexmapper', methods=['POST'])
def hexmapper():
    """
    < HEXMAPPER >
    Get poylgon and returns corresponding h3 indexes
    """
    global border
    try:
        
        data = request.get_json()
        border = city_data[city_data['NAME_1'] == data['city']]
        border = gpd.GeoDataFrame(geometry=[border.unary_union], crs='EPSG:4326')
        hexagons = border.h3.polyfill_resample(9).reset_index()
        result = {'message': 'Success', 'data': hexagons['h3_polyfill'][:10].tolist()}
        hexagons.to_csv(f"hexmapper_outputs/{data['city']}_hexmapper.csv")
        return jsonify(result)

    except Exception as e:
        return jsonify({'message': 'Error', 'error': str(e)}), 500

@app.route('/score_hexagons', methods=['POST'])
def score_hexagons():
    data = request.get_json()
    func_data = func.score_osm_functions(CITY=data['city'],FUNC=data['function'])
    return jsonify(func_data.to_json())

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
