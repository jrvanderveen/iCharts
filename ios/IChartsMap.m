/**
 * IChartsMap.m
 * iCharts
 *
 * Ian Fisk on 11/1/16
 */

#import "IChartsMap.h"
#import "IChartsTileOverlay.h"

@interface IChartsMap ()
{
	NSString *m_regionId;
}

@end

@implementation IChartsMap

// initial bottom left corner region
const NSInteger c_topLatitudeInitial = -80;
const NSInteger c_leftLongitudeInitial = -151;
const NSInteger c_latDeltaInitial = 40;
const NSInteger c_longDeltaInitial = 60;

- (NSString *)regionId
{
	return m_regionId;
}

- (void)setRegionId:(NSString *)regionId
{
	if (regionId == nil || [regionId isEqual:@""])
		return;
	
	m_regionId = regionId;
	NSString *urlTemplate = [NSString stringWithFormat:@"%@%@/{z}/{x}/{y}.png", [[IChartsMap applicationDocumentsDirectory] absoluteString], regionId];
	
	IChartsTileOverlay *tileOverlay = [[IChartsTileOverlay alloc] initWithURLTemplate:urlTemplate];
	tileOverlay.geometryFlipped = YES;
	tileOverlay.canReplaceMapContent = YES;
	tileOverlay.minimumZ = 4;
	tileOverlay.maximumZ = 6;
	[self addOverlay:tileOverlay level:MKOverlayLevelAboveLabels];
	
	[self setRegion:MKCoordinateRegionMake(CLLocationCoordinate2DMake(c_topLatitudeInitial, c_leftLongitudeInitial), MKCoordinateSpanMake(c_latDeltaInitial, c_longDeltaInitial))];
}

+ (NSURL *)applicationDocumentsDirectory
{
	return [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
}

@end
