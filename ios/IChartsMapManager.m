/**
 * IChartsMapManager.m
 * iCharts
 *
 * Ian Fisk on 11/1/16
 */

#import "RCTConvert+MapKit.h"

#import <MapKit/MapKit.h>
#import "IChartsMap.h"
#import "IChartsMapManager.h"
#import "IChartsTileOverlay.h"

@interface IChartsMapManager ()
{
@private
	BOOL m_isManuallyChangingRegion;
}

@end

@implementation IChartsMapManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(regionId, NSString)

const NSInteger c_topLatitude = -40;
const NSInteger c_rightLongitude = 15;

- (UIView *)view
{
	IChartsMap *map = [[IChartsMap alloc] init];
	map.delegate = self;
	
	return map;
}

#pragma mark MKMapViewDelegate

- (MKOverlayRenderer *)mapView:(IChartsMap *)mapView rendererForOverlay:(id <MKOverlay>)overlay
{
	if ([overlay isKindOfClass:[MKTileOverlay class]])
	{
		IChartsTileOverlay *tileOverlay = (IChartsTileOverlay *)overlay;
		return [[MKTileOverlayRenderer alloc] initWithTileOverlay:tileOverlay];
	}
	
	return nil;
}

- (void)mapView:(MKMapView *)mapView regionDidChangeAnimated:(BOOL)animated
{
	if (m_isManuallyChangingRegion)
		return;
	
	MKCoordinateRegion newRegion = mapView.region;
	BOOL resetRegion = NO;
	
	// only worry about scrolling above the tiles since it sits at the bottom of the map
	if (mapView.region.center.latitude > c_topLatitude)
	{
		newRegion.center.latitude = c_topLatitude;
		resetRegion = YES;
	}
	
	// Since the map extends to the left to -180 degrees longitude and to the right 15 degrees
	// longitude when fully zoomed in, split the difference to determine where to set the region
	int midPoint = (180 - c_rightLongitude) / 2 + c_rightLongitude;
	if (mapView.region.center.longitude > midPoint)
	{
		newRegion.center.longitude = -180;
		resetRegion = YES;
	}
	else if (mapView.region.center.longitude > c_rightLongitude && mapView.region.center.longitude < midPoint)
	{
		newRegion.center.longitude = c_rightLongitude;
		resetRegion = YES;
	}
	
	if (resetRegion)
	{
		m_isManuallyChangingRegion = YES;
		[mapView setRegion:newRegion animated:YES];
		m_isManuallyChangingRegion = NO;
		
#ifdef DEBUG
		NSLog(@"Resetting the new region to be (%f, %f) with span (%f, %f)", newRegion.center.latitude, newRegion.center.longitude, newRegion.span.latitudeDelta, newRegion.span.longitudeDelta);
#endif
	}

#ifdef DEBUG
	NSLog(@"Current mapView region is (%f, %f) with span (%f, %f)",  mapView.region.center.latitude, mapView.region.center.longitude, mapView.region.span.latitudeDelta, mapView.region.span.longitudeDelta);
#endif
}

@end
